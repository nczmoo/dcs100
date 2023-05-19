class UIRefresh {
    dungeonBG = '#4A4B4D';
	opposites = { dungeon: 'store', store: 'dungeon' };
	storeBG = '#766e73';
	outsideBG = '#9b9fa6';
	playerHitBG = '#5F322C';
	playerHitChangeBGDelay = 50;
    potionsHidden = true;
    storeRevealed = false;
    go (){ //05/18/23 not refactoring this....just don't feel like it
		if (game.config.sound && $("#soundConfig").attr('src', 'img/sound-off.png')){
			$("#soundConfig").attr('src', 'img/sound-on.png');
		} else if (!game.config.sound && $("#soundConfig").attr('src', 'img/sound-on.png')){
			$("#soundConfig").attr('src', 'img/sound-off.png');
		}
		

		if (game.player.inventory.gold > 0 && ui.menuHidden){
            $("#menu").removeClass('d-none'); 
            ui.menuHidden = false;
        }
		if (game.dungeon.steps > 0 && game.dungeon.crawling){
			$("#nextChestAt").html("(" + (game.dungeon.steps / game.dungeon.chest.foundAt * 100).toFixed(1) + "%)");
		}
		$("#upgrade").prop('disabled', false);
		if (game.player.inventory.gold < game.slots.lines.max){
			$("#upgrade").prop('disabled', true);
		}
		let stepCent = Math.round(game.dungeon.steps / game.dungeon.lastDive * 100);
		$("#monsters").addClass('d-none');
		$(".autoSettings").addClass('d-none');
		if (!game.dungeon.crawling){
			$("#monsters").removeClass('d-none');
			$(".autoSettings").removeClass('d-none');
		}
		$("#stepCent").html(stepCent)
		$("#stepCaption").removeClass('text-decoration-underline');
		if(stepCent > 100){
			$("#stepCaption").addClass('text-decoration-underline');
		}
		$("#stepCaption").removeClass('d-none');
		if (!game.dungeon.forward){
			$("#stepCaption").addClass('d-none');
		}
		if (game.player.inventory.gold > 0 && !this.storeRevealed){
			this.storeRevealed = true;
			$("#menu").removeClass('d-none');
		}
		for (let i in game.config.auto){
			$("#auto-" + i).prop('checked', game.config.auto[i]);
		}
		
		if ($("#maxArmorSection").hasClass('d-none') && game.player.stats.maxArmor > 0){
			$("#maxArmorSection").removeClass('d-none');
		}
        let icons = ['health', 'armor', 'gold', 'weapon', 'cure', 'heal', 'portal', 'repair', 'key'];
		for (let icon of icons){
			let modifier = '-outside';
			if (game.dungeon.crawling){
				modifier = '';
			} else if (ui.window == 'store'){
				modifier = '-store';
			}
			$("#" + icon + "Icon").attr('src', 'img/icon-' + icon + modifier + ".png" );
		}		
		$(".menu").addClass('d-none');
		if (!game.dungeon.crawling ){			
			$("#menu-" + this.opposites[ui.window]).removeClass('d-none');
		}
		for (let opening in ui.opened){
			if (ui.opened[opening] && $("#" + opening + "Chest").hasClass('d-none')){
				$("#" + opening + "Chest").removeClass('d-none')
			}
		}
		$("#gold").html(game.player.inventory.gold);
		$("#key").html(game.player.inventory.keys);
		if (game.player.inventory.keys > 0 && $("#keySection").hasClass('d-none')){
			$("#keySection").removeClass('d-none')
		}
		let fills = ['armor', 'health',  'maxArmor', 'maxHealth', 'weapon'];
		for (let fill of fills){			
			$("#" + fill).html(game.player.stats[fill]);
		}
		fills = ['lastDive', 'steps'];
		for (let fill of fills){			
			$("#" + fill).html(game.dungeon[fill]);
		}
		fills = ['value','max'];
		for (let fill of fills){			
			$("#lines-" + fill).html(game.slots.lines[fill]);
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
			$("#crawl-button").attr('src', 'img/crawl-exit.png');
		} else if (game.dungeon.crawling && !game.dungeon.forward){
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
			$("#healthBar").addClass('poisoned');
		}
	}
}