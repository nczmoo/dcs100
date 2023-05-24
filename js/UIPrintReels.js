class UIPrintReels {
    printReel(reelID, real){		
		let positions = game.slots.reels.fetchPositions(reelID, real);
		let straightClass = '', straightFile = '';
		if (real){
			straightClass = 'straight';
			straightFile = '-straight';
		}
		return "<div id='reel-" + reelID + "-prev' class='reel'>" 
			+ "<img src='img/reel-"
			+ game.slots.reels.fetch(reelID, positions.prev)
			+ ".png'></div><div  id='reel-" + reelID + "-pos' class='reel " + straightClass + "'>" 
			+ "<img src='img/reel-"
			+ game.slots.reels.fetch(reelID, positions.pos)
			+ straightFile +  ".png'></div><div id='reel-" + reelID + "-next' class='reel'>" 
			+ "<img src='img/reel-"
			+ game.slots.reels.fetch(reelID, positions.next)
			+ ".png'></div>"
	}

	go(real){
		for (let reelID = 0; reelID < game.slots.reels.numOfReels; reelID++){
			let txt = this.printReel(reelID, real);
			$("#reel-" + reelID).html(txt);
		} 
	}
}