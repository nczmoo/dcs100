class UIAnimation {
    dStep = 0;
    happening = false;

	hitBG = [null,  '#5B3733', '#573C39', '#534140', '#4E4646', '#4A4B4D'];
    positions = game.slots.reels.positions.slice();
    timeToRoll = 1000;
    timeToDisplayWin = 350;
    winDisplayedAt = null;
    winPointer = null;	
	flashSlot = 0;

    loop(){
		if (ui.playerHitAt != null ){
			$("body").css('background-color', ui.animation.hitBG[ui.playerHitAt]);
			ui.playerHitAt ++;
		}
		if (ui.playerHitAt != null && ui.playerHitAt >= ui.animation.hitBG.length ){
			ui.playerHitAt = null;
		}

		if (ui.animation.winDisplayedAt != null && Date.now() - ui.animation.winDisplayedAt < ui.animation.timeToDisplayWin){
			return;

		} else if (ui.animation.winDisplayedAt != null && Date.now() - ui.animation.winDisplayedAt > ui.animation.timeToDisplayWin){
			ui.animation.winDisplayedAt = null;
			ui.animation.happening = false;
		}
		if (ui.pulledAt != null && Date.now() - ui.pulledAt < ui.animation.timeToRoll){
			ui.animation.roll();
			ui.animation.flashSlots();
		} else if (ui.pulledAt != null && Date.now() - ui.pulledAt >= ui.animation.timeToRoll){
			ui.pulledAt = null;
			ui.refresh();
			ui.printReels(true);
		} else if (ui.wins != null){
			ui.printStoreLog();
			ui.animation.animatingWins();
			return;
		}
		if (ui.dying){
			ui.isDead();
		} else if (ui.comingBack){
			ui.isComingBack();
		}
		ui.happening = false;
	}

	animatingWins(){
		this.winDisplayedAt = Date.now();
		this.happening = true;
		let win = game.slots.wins.list[ui.wins[this.winPointer]];
		$(".reel").removeClass('win');
		for (let reelID in win){
			let positions = game.slots.reels.fetchPositions(reelID, true);
			$("#reel-" + reelID + "-" + win[reelID]).addClass('win');
			$("#reel-" + reelID + "-" + win[reelID]).html("<img src='img/reel-" + game.slots.reels.fetch(reelID, positions[win[reelID]]) + "-win.png'>")
		}
		this.winPointer++;
		if (this.winPointer > ui.wins.length - 1 || this.winPointer > game.slots.lines - 1){
			this.winPointer = null;
			ui.wins = null;
		}
		ui.popFromPopping();
		ui.printDeltas()
	}

	animateWins(wins){
		if(wins.length < 1){
			return;
		}
		ui.wins = wins;
		this.winPointer = 0;
	}

	exit(){
		if (game.dungeon.forward && ui.exiting != 0){
			ui.exiting = 0;			
		} 
		if (game.dungeon.forward){
			return;
		}
		ui.exiting ++;

		if (ui.exiting > 3){
			ui.exiting = 0;
		}
	}

	flashSlots(){
		this.flashSlot++;
		let target = 4;
		if (this.flashSlot < target || !game.slots.pulling){
			return;
		}
		this.flashSlot = 0;
		if ($("#img-autopull").attr('src') == "img/slots-autopull.png"){
			$("#img-autopull").attr('src', "img/slots-autopull-flash.png");
			
		} else if ($("#img-autopull").attr('src') == "img/slots-autopull-flash.png"){
			$("#img-autopull").attr('src', "img/slots-autopull.png");
		}
	}

    roll(){
		for (let reelID = 0; reelID < game.slots.reels.length; reelID ++){
			this.positions[reelID]++;
			if (this.positions[reelID] >= game.slots.reels.length - 1){
				this.positions[reelID] = 0;
			}			
		}		
		ui.printReels(false);
	}

    step(){


		$("#game-box").attr('src', 'img/d-' + this.dStep + '.png');

		if (game.dungeon.forward){
			this.dStep++;
			
		} else {
			this.dStep --;
		}

		if (this.dStep > 5){
			this.dStep = 0;
		}
		if (this.dStep < 0){
			this.dStep = 5;
		}
	}
}