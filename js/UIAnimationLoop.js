class UIAnimationLoop {
    go(){
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
			ui.print.reels(true);
		} else if (ui.wins != null){
			ui.print.storeLog();
			ui.animation.animatingWins();
			return;
		}
		if (ui.animation.dead.dying){
			ui.animation.dead.isDead();
		} else if (ui.animation.dead.comingBack){
			ui.animation.dead.isComingBack();
		}
		ui.happening = false;
	}
}