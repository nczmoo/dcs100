class UIRefresh {
	display = new UIRefreshDisplay();
    dungeonBG = '#4A4B4D';
	fill = new UIRefreshFill();
	images = new UIRefreshImages();
	storeBG = '#766e73';
	outsideBG = '#9b9fa6';
	playerHitBG = '#5F322C';
    potionsHidden = true;


    go (){ //05/18/23 not refactoring this....just don't feel like it				
		this.display.go();
		this.fill.go();
		this.images.go();
		$("#upgrade").prop('disabled', false);
		if (game.player.inventory.gold < game.slots.lines.max){
			$("#upgrade").prop('disabled', true);
		}
		let stepCent = Math.round(game.dungeon.steps / game.dungeon.lastDive * 100);
		$("#stepCent").html(stepCent)
		$("#stepCaption").removeClass('text-decoration-underline');
		if(stepCent > 100){
			$("#stepCaption").addClass('text-decoration-underline');
		}		
		for (let i in game.config.auto){
			$("#auto-" + i).prop('checked', game.config.auto[i]);
		}			
		for (let i in game.player.inventory.potions){
			let potion = game.player.inventory.potions[i];				
			if ($("#" + i + "Section").hasClass('d-none') && potion > 0){
				$("#" + i + "Section").removeClass('d-none')
			}
			$("#" + i).html(potion);
			$("#drink-" + i).prop('disabled', !(potion > 0 &&  game.dungeon.crawling));
			if (potion == 'portal' && game.mob.entity != null){
				$("#drink-portal").prop('disabled', true);
			}
		}
		$("body").css('color', 'white');
		$(".dungeon").removeClass('d-none');
		$(".hideInStore").removeClass('d-none');
		$(".secondary").removeClass('outside');
		$(".secondary").removeClass('store');
		if (ui.window == 'dungeon' && !game.dungeon.crawling){
			$(".secondary").addClass('outside');
		}

		if (ui.playerHitAt != null) {
		} else if (ui.window == 'store'){
			$("#gold").addClass('store');
			$(".hideInStore").addClass('d-none');
			$("body").css('background-color', this.storeBG);			
		} else if (ui.window == 'dungeon' && game.dungeon.crawling){
			$("body").css('background-color', this.dungeonBG);
		} else if (ui.window == 'dungeon' && !game.dungeon.crawling){	
			$("body").css('background-color', this.outsideBG);
			$("#dungeonLogTitle").addClass('d-none');
		}
		if (!game.dungeon.crawling){
			$("#crawl-button").attr('src', 'img/crawl-enter.png');
			$(".dungeon").addClass('d-none');
			$("body").css('color', 'black');
		} else if (game.dungeon.crawling && game.dungeon.forward){
			console.log('u');
			$(".direction").html('&uarr;');
			$("#crawl-button").attr('src', 'img/crawl-exit.png');
		} else if (game.dungeon.crawling && !game.dungeon.forward){
			console.log('d');
			$(".direction").html('&darr;');
			$("#crawl-button").attr('src', "img/crawl-exiting-" + ui.exiting + ".png");
			ui.animation.exit();
		}
		$("#pull").prop('disabled', false);		
		if (game.player.inventory.gold < 1 || ui.wins != null || game.slots.pulling){
			$("#pull").prop('disabled', true);
		}
		$("#autopull").prop('disabled', false);
		if (game.player.inventory.gold < 1){
			$("#autopull").prop('disabled', true);
		}		
		ui.print.log();
		let width = (game.player.stats.health / game.player.stats.maxHealth * 100) + "%"
		$("#healthBar").css('width', width);
        width = (game.player.stats.armor / game.player.stats.maxArmor * 100) + "%"
		$("#armorBar").css('width', width);
		$("#healthBar").removeClass('poisoned');
		if (game.player.stats.poisonCounter > 0){
			$("#healthIcon").attr('src', 'img/icon-health-poisoned.png');
			$("#healthBar").addClass('poisoned');
		}
	}
}