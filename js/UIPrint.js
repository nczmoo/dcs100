class UIPrint {
    deltaIntervals = {};
    deltasArr = {};
    logs = [];	
    reelsArr = [];
    reelCaptions = ''; // this doesn't appear to being fed from anywhere else???

    storeLogs = [];
	//this should be below 100 lines but I just don't have it in me to trim it down
	
    constructor(){
		this.deltasArr.gold = 0;
		this.deltasArr.health = 0;
		this.deltasArr.armor = 0;
		this.deltasArr.weapon = 0;
		for (let potion of game.player.inventory.potionList){
			this.deltasArr[potion] = 0;
		}
		this.reels(true);
		
	}

    addToReels(){
		if (this.reelsArr.length < 1){
			return;
		}
		let txt = "You have some new stuff added to your reels: "
		for (let i in this.reelsArr){
			let name = this.reelsArr[i];
			txt += "<span class='fw-bold'>" + game.slots.reels.captions[name] + "</span>"
			+ " <img src='img/reel-" + name + ".png' height='24' width='24'>";

			if (i == this.reelsArr.length - 1){
				continue;
			} else if ( i == this.reelsArr.length - 2 && this.reelsArr.length > 1){
				txt += " and ";
				continue;
			}
			txt += ", ";
		}				
		$("#reelsCaption").html(txt);
		this.reelsArr = [];
	}

	deltas(){
		for (let id in this.deltasArr){
			let n = this.deltasArr[id];
			if (n == 0){
				continue;
			}
			let txt = '(';
		
			if (n == 0){
				return;
			}

			if (n < 0){
				txt += "<span class='deltaMin fs-5 fw-bold'>" + n + "</span>";
			} else if (n > 0){
				txt += "<span class='deltaPlus fs-5'>+" + n + "</span>";
			}
			txt += ")";
			$("#" + id + "Delta").html(txt);
			this.deltasArr[id] = 0;
			this.deltaIntervals[id] = setTimeout(function(){ $("#" + id + "Delta").html(''); }, 1000);
		}
	}
	
	log(){
		if (this.logs.length > 0 && $("#dungeonLogTitle").hasClass('d-none')){
			$("#dungeonLogTitle").removeClass('d-none')
		}
		let txt = '';
		for (let i in this.logs){
			let log = this.logs[i];
			txt += log;
		}
		$("#log").html(txt);
	}

	printReel(reelID, real){		
		let positions = game.slots.reels.fetchPositions(reelID, real);
		let straightClass = '', straightFile = '';
		if (real){
			straightClass = 'straight';
			straightFile = '-straight';
		}
		/* keep this for debugging
		console.log(reelID, positions, game.slots.reels.values, game.slots.reels.fetch(reelID, positions.prev), game.slots.reels.fetch(reelID, positions.pos), game.slots.reels.fetch(reelID, positions.next))
		*/
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

	reels(real){
		for (let reelID = 0; reelID < game.slots.reels.numOfReels; reelID++){
			let txt = this.printReel(reelID, real);
			$("#reel-" + reelID).html(txt);
		} 
	}

	storeLog(){
		if (this.storeLogs.length > 0 && $("#storeLogTitle").hasClass('d-none')){
			$("#storeLogTitle").removeClass('d-none')
		}
		let txt = '';
		for (let i = this.storeLogs.length - 1; i >= 0; i --){
			let log = this.storeLogs[i];
			txt += log;
		}
		$("#storeLog").html(txt);
		$("#reelsCaption").html(this.reelCaptions);
		this.reelCaptions = '';
	}

}