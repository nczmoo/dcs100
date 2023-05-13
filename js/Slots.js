class Slots {
	lines = 1; 
	maxLines = 10;
	pulling = false;
	reels = new SlotReels();
	wins = new SlotWins();




	changeLines(delta){
		if ((delta == 'more' && (game.player.gold == 0 
			|| this.lines == game.player.gold 
			|| this.lines >= this.maxLines)) 
			|| (delta == 'less' && this.lines == 1)){
			return;
		}
		if (delta == 'more'){
			this.lines ++;
			return;
		}
		this.lines --;
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
		$("#reelsCaption").html('');
	}
}