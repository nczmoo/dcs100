class UIAnimation {
	dead = new UIAnimationDead();
    happening = false;
	hitBG = [null,  '#5B3733', '#573C39', '#534140', '#4E4646', '#4A4B4D'];
	intro = new UIAnimationIntro();
	introFinished = null;

	loop = new UIAnimationLoop();
    positions = game.slots.reels.positions.slice();
    timeToRoll = 1000;
    timeToDisplayWin = 350;
    winDisplayedAt = null;
    winPointer = null;	
	flashSlot = 0;

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
		if (this.winPointer > ui.wins.length - 1 || this.winPointer > game.slots.lines.value - 1){
			this.winPointer = null;
			ui.wins = null;
		}
		ui.popFromPopping();
		ui.print.deltas()
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


	fadeIntro(){
		
		let opacity = $("#story").css('opacity');
		let delta = .01;
		$("#story").css('opacity', opacity - delta);
		if (opacity == 0){
			ui.introFading = false;
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

	hit(id){
		$("#" + id).css('animation-name', 'shake');
		$("#" + id).css('animation-duration', '.5s');
		setTimeout(function(){
			$("#" + id).css('animation-name', '');
			$("#" + id).css('animation-duration', '');
		}, 1000);
	}

    roll(){
		for (let reelID = 0; reelID < game.slots.reels.length; reelID ++){
			this.positions[reelID]++;
			if (this.positions[reelID] >= game.slots.reels.length - 1){
				this.positions[reelID] = 0;
			}			
		}		
		ui.print.reels(false);
	}
	

}