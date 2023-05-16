class SlotWins {
    list = [
        ['pos',	'pos',	'pos'],
        ['prev', 'pos',	'next'],
        ['next', 'pos',	'prev'],
        ['next', 'pos',	'next'],
        ['prev', 'pos',	'prev'],
        ['prev', 'prev', 'prev'],
        ['next', 'next', 'next'],
        ['pos', 'prev' , 'pos'],
        ['pos', 'next' , 'pos'],
    ];

    fetch(){
		let reels = [];
		for (let reelID = 0; reelID < game.slots.reels.numOfReels; reelID ++){
			let positions = game.slots.reels.fetchPositions(reelID, true);
			reels.push(positions);
		}
		let wins = [];
		for (let winID in this.list){
			let win = this.list[winID];
			if (game.slots.reels.fetch(0, reels[0][win[0]])
				== game.slots.reels.fetch(1, reels[1][win[1]])
				&& game.slots.reels.fetch(0, reels[0][win[0]])
				== game.slots.reels.fetch(2, reels[2][win[2]])){
				wins.push(Number(winID));
			}			
		}
		this.process(wins);		
		ui.animation.animateWins(wins);
	}

    process(wins){
		let winsPaid = 0;
		game.slots.checkLines();
		if(wins.length < 1){
			return;
		}					
		let positions = game.slots.reels.fetchPositions(0, true);
		for (let winID of wins){			
			let what = game.slots.reels.fetch(0, positions[this.list[winID][0]]);		
			let pay = game.slots.lines;			
			if (winsPaid >= game.slots.lines){
				return;
			}
			winsPaid ++;			
			if (what.split('-')[0] == 'maxHealth'){
				ui.pop(what.split('-')[0]);
				game.player.maxHealth += Number(what.split('-')[1]) * pay;
				ui.delta('health', Number(what.split('-')[1]) * pay)
				game.player.resetHealth();
				continue;
			} else if (game.player.potionList.includes(what)){
				ui.pop(what);
				if (ui.potionsHidden){
					ui.potionsHidden = false;
				}
				ui.delta(what, pay)
				game.player.potions[what] += pay;
				continue;
			}				
			ui.pop(what);
			
			game.player[what] += pay;			
			game.player.resetArmor();
		}
	}
}