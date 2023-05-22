class Slots {
	invested = 0;
	lines = new SlotLines();
	pullNum = 1;
	pulling = false;
	reels = new SlotReels();
	wins = new SlotWins();

	pull(){

		this.lines.check();
		if (game.player.inventory.gold < 1 || ui.animation.happening || ui.pulledAt != null ){			
			return;
		}
		game.sound.play('slot-pull');
		ui.pulledAt = Date.now();
		this.invested += this.lines.value;
		this.reels.add(this.invested);

		game.player.inventory.gold -= this.lines.value;
		ui.delta('gold', -this.lines.value);		
		ui.print.deltas();
		ui.refresh();
		if (game.player.inventory.gold > 0 && game.player.inventory.gold < this.lines.value){
			this.lines.value = game.player.inventory.gold;
		}
		if (game.player.inventory.gold < 1){
			this.pulling = false;
			game.player.inventory.gold = 0;
			this.lines.value = 1;
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
		$("#pullNum").html("#" + this.pullNum.toLocaleString());
		this.pullNum++;
	}


}