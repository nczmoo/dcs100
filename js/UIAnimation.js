class UIAnimation {
	dead = new UIAnimationDead();
    happening = false;
	hitBG = [null,  '#5B3733', '#573C39', '#534140', '#4E4646', '#4A4B4D'];
	introFinished = null;
	introPointer = 0;
	introStoryArrPointer = 0;
	loop = new UIAnimationLoop();
    positions = game.slots.reels.positions.slice();
    timeToRoll = 1000;
    timeToDisplayWin = 350;
    winDisplayedAt = null;
    winPointer = null;	
	flashSlot = 0;
	story = ["You finally made it to one of the greatest dungeons in the land.",
	"You trekked through the desert and jungle.",
	"Sailed across three seas to get here.",
	"All of the other dungeons are filled with adventurers seeking their fortune, but this dungeon is all yours!",
	"They say even the rats have gold.",
	"You're going to gamble it all away anyways, but who cares?",
	"Life's a gamble and you're trying to win every jackpot you can before you go bust."];

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
	showIntro(){		

		let txt = "", arrI = 0, i = -1;
		//console.log('start', i, this.introPointer, arrI, this.introStoryArrPointer);
		while(1){
			if (this.introPointer == 135){
				//console.log(i, this.introPointer, arrI, this.introStoryArrPointer, txt);
			}
			i++;
			if (i == 0){
				txt += "<div class='mb-3'>";			
			}		

			let char = this.story[arrI][i];
			
			//console.log(char);
			txt += char;
			//console.log(i, this.introPointer, arrI, this.introStoryArrPointer);

						
			if (i >= this.story[arrI].length - 1){
				//console.log('eol');
				i = -1;
				arrI++;
				txt += "</div>";
			}

			
			if (arrI >= this.story.length || arrI > this.introStoryArrPointer || (arrI == this.introStoryArrPointer && i >= this.introPointer)){			
				//console.log('break');
				break;
			}
						
			



			if (char == undefined){
				//console.log(i, this.introPointer, arrI, this.introStoryArrPointer);
				ui.intro = false;
			}
		}
		//console.log('finish', i, this.introPointer, arrI, this.introStoryArrPointer, txt);
		txt += "</div>";

		$("#story").html(txt);
		this.introPointer++;
		if (this.introStoryArrPointer > this.story.length - 1){
			ui.introFading = true;
			ui.intro = false;
			return;
		}	
		if (this.story[this.introStoryArrPointer].length == this.introPointer){
			this.introStoryArrPointer++;
			this.introPointer = 0;
		}
	
	}

}