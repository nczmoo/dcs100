class Slots {
	lines = 1; 
	maxLines = 1;
	pullNum = 1;
	pulling = false;
	reels = new SlotReels();
	wins = new SlotWins();




	changeLines(delta, n){
		if ((delta == 'more' && (game.player.gold == 0 
			|| this.lines == game.player.gold 
			|| this.lines >= this.maxLines)) 
			|| (delta == 'less' && this.lines == 1)){
			return;
		}
		if (delta == 'more'){
			this.lines += n;
			if (this.lines > this.maxLines){
				this.lines = this.maxLines;				
			}			
			if (this.lines > game.player.gold){
				this.lines = game.player.gold;
			}
			ui.refresh();
			return;
		}
		this.lines -= n;
		if (this.lines < 1){
			this.lines = 1;
		}
		ui.refresh();
	}

	checkLines(){
        if (this.lines < 1){
            this.lines = 1;
        }
        if (this.lines < 2){
            return;
        }
        if (this.lines > this.maxLines){
            this.lines = this.maxLines;
        }

        if (this.lines > this.gold){
            this.lines = this.gold;
        }
    }



	pull(){
		this.checkLines();
		if (game.player.gold < 1 || ui.animation.happening || ui.pulledAt != null ){			
			return;
		}
		ui.pulledAt = Date.now();

		game.player.gold -= this.lines;
		ui.delta('gold', -this.lines);		
		ui.printDeltas();
		ui.refresh();
		if (game.player.gold > 0 && game.player.gold < this.lines){
			this.lines = game.player.gold;
		}
		if (game.player.gold < 1){
			this.pulling = false;
			game.player.gold = 0;
			this.lines = 1;
		}
		for (let reelID in this.reels.positions){
			let rand = null;
			while (1){
				rand = this.reels.fetchRandPos(reelID);
				if (rand != this.reels.positions[reelID]){
					break;
				}
			}
			this.reels.positions[reelID] = rand;
		}
		this.wins.fetch();
		$("#pullNum").html(this.pullNum.toLocaleString());
		this.pullNum++;

	}

	upgrade(){
		if (game.player.gold < this.maxLines * 10){
			return;
		}
		game.player.gold -= this.maxLines * 10;
		$(".changeLines-" + this.maxLines).removeClass('d-none');
		this.maxLines *= 10;
		
		$("#upgrade").attr('src', 'img/slots-upgrade-' + (this.maxLines * 10) + ".png")
		if (this.maxLines >= 1000){
			$("#upgrade").addClass('d-none');
		}
		ui.refresh();
	}
}