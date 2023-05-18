class UIAnimationDead{
    comingBack = false;
	dying = false;
    isDead(){
		let bodyBG = $("body").css('background-color')
		let intBG = parseInt(rgb2hex(bodyBG), 16);
		let delta = 1118481;
		let changed = intBG - delta;
		let hexBG = (changed).toString(16)
		if (changed < 200000){
			hexBG = '000000';
			this.dying = false;
			this.comingBack = true;
		}
		$("body").css('background-color', '#' + hexBG);
		

	}

	isComingBack(){
		let bodyBG = $("body").css('background-color')
		let intBG = parseInt(rgb2hex(bodyBG), 16);
		let delta = 1118481;
		let changed = intBG + delta;
		let hexBG = (changed).toString(16)
		if (changed > 10198950){
			hexBG = ui.uirefresh.outsideBG;
			this.comingBack = false;
			ui.refresh();
		}
		$("body").css('background-color', '#' + hexBG);
		
	}	
}