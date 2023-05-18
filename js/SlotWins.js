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

	pluralize(what, quantity){
		if (quantity > 1){
			return what + "s";
		}
		return what;
	}

    process(wins){
		let winsPaid = 0;
		game.slots.lines.check();
		if(wins.length < 1){
			return;
		}					
		let positions = game.slots.reels.fetchPositions(0, true);
		for (let winID of wins){			
			let what = game.slots.reels.fetch(0, positions[this.list[winID][0]]);		
			let msg = 'Pull #' + game.slots.pullNum ;
			let pay = game.slots.lines.value;			
			if (winsPaid >= game.slots.lines.value){
				return;
			}
			winsPaid ++;					
			if (what.substring(0, 'maxHealth'.length) == 'maxHealth'){
				ui.pop(what.split('-')[0]);
				let delta = Number(what.split('-')[1]) * pay;
				game.player.stats.maxHealth += delta
				ui.delta('health', delta);
				msg += "<img class='ms-2'  src='img/icon-health-store.png'> Your max health was increased by " + delta + ". (It is now at " + game.player.stats.maxHealth + ")";
				ui.addToStoreLog(msg);
				game.player.stats.resetHealth();
				continue;
			} else if (game.player.inventory.potionList.includes(what)){
				ui.pop(what);
				if (ui.potionsHidden){
					ui.potionsHidden = false;
				}
				ui.delta(what, pay)
				game.player.inventory.potions[what] += pay;
				
				if (what == 'key'){
					msg += "<img class='ms-2'  src='img/icon-" + what 
						+ "-store.png'> You received " + pay + " " 
						+ this.pluralize('key', pay) + ". (You now have " 
						+ game.player.inventory.potions[what] + ".)" ;
				} else {
					msg += "<img class='ms-2'  src='img/icon-" + what 
						+ "-store.png'> You received " + pay + " " + what 
						+ " " + this.pluralize('potion', pay) 
						+ ". (You now have " 
						+ game.player.inventory.potions[what] + ".)" ;
				}
				ui.addToStoreLog(msg);
				
				continue;
			}			
			game.player.stats[what] += pay;			
			game.player.stats.resetArmor();
			ui.pop(what);
			let caption = what;
			if (Object.keys(game.slots.reels.captions).includes(what)){
				caption = game.slots.reels.captions[what];
			}
			let imgSrc = what;
			if (what == 'maxArmor'){
				imgSrc = 'armor'
			}
			msg += "<img class='ms-2' src='img/icon-" + imgSrc 
				+ "-store.png'> You received +" + pay + " to your " 
				+  this.pluralize(caption, pay) + ". (It is now at " 
				+ game.player.stats[what] + ".)";
			ui.addToStoreLog(msg);			
		}
	}
}