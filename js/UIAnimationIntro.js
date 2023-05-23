class UIAnimationIntro {
    introPointer = 0;
	introStoryArrPointer = 0;
    show(){		
		let txt = "", arrI = 0, i = -1;
		while(1){
			i++;
			if (i == 0){
				txt += "<div class='mb-3'>";			
			}		
			let char = game.lore[arrI][i];			
			txt += char;						
			if (i >= game.lore[arrI].length - 1){
				i = -1;
				arrI++;
				txt += "</div>";
			}			
			if (arrI >= game.lore.length || arrI > this.introStoryArrPointer || (arrI == this.introStoryArrPointer && i >= this.introPointer)){			
				break;
			}
			if (char == undefined){
				ui.intro = false;
			}
		}
		txt += "</div>";
		$("#story").html(txt);
		this.introPointer++;
		if (this.introStoryArrPointer > game.lore.length - 1){
			ui.introFading = true;
			ui.intro = false;
			return;
		}	
		if (game.lore[this.introStoryArrPointer].length == this.introPointer){
			this.introStoryArrPointer++;
			this.introPointer = 0;
		}
	
	}
}