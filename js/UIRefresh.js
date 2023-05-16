class UIRefresh {
    dungeonBG = '#4A4B4D';
	opposites = { dungeon: 'store', store: 'dungeon' };
	storeBG = '#766e73';
	outsideBG = '#9b9fa6';
    potionsHidden = true;
    storeRevealed = false;

    go (){
		
		let stepCent = Math.round(game.dungeon.steps / game.dungeon.lastDive * 100);
		$("#monsters").addClass('d-none');
		if (!game.dungeon.crawling){
			$("#monsters").removeClass('d-none');
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
		if (game.player.gold > 0 && !this.storeRevealed){
			this.storeRevealed = true;
			$("#menu").removeClass('d-none');
		}
		for (let i in game.config.auto){
			$("#auto-" + i).prop('checked', game.config.auto[i]);
		}
		
		if ($("#maxArmorSection").hasClass('d-none') && game.player.maxArmor > 0){
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
		
		let fills = ['armor', 'gold', 'health',  'maxArmor', 'maxHealth', 'weapon'];
		for (let fill of fills){			
			$("#" + fill).html(game.player[fill]);
		}
		fills = ['lastDive', 'steps'];
		for (let fill of fills){			
			$("#" + fill).html(game.dungeon[fill]);
		}
		fills = ['lines','maxLines'];
		for (let fill of fills){			
			$("#" + fill).html(game.slots[fill]);
		}

		for (let i in game.player.potions){
			let potion = game.player.potions[i];	
			if (this.potionsHidden && potion > 0)		{
				$(".potions").removeClass('d-none');	
				this.potionsHidden = false;
			}
			if ($("#" + i + "Section").hasClass('d-none') && potion > 0){
				$("#" + i + "Section").removeClass('d-none')
			}
			$("#" + i).html(potion);
			$("#drink-" + i).prop('disabled', !(potion > 0 &&  game.dungeon.crawling));
			if (potion == 'portal' && game.mob.entity != null){
				$("#drink-portal").prop('disabled', true);
			}
		}
		$("#crawl-button").removeClass('btn-success');
		$("#crawl-button").removeClass('btn-danger');
		$("#crawl-button").removeClass('btn-warning');
		
		$("body").css('color', 'white');
		//$(".menu").css('color', 'white');
		$(".dungeon").removeClass('d-none');
		if(ui.window == 'store'){						
			$("body").css('background-color', this.storeBG);			
		} else if (ui.window == 'dungeon' && game.dungeon.crawling){
			$("body").css('background-color', this.dungeonBG);
		} else if (ui.window == 'dungeon' && !game.dungeon.crawling){	
			$("body").css('background-color', this.outsideBG);
		}
		if (!game.dungeon.crawling){
			$(".dungeon").addClass('d-none');
			
			$("body").css('color', 'black');
			//$(".menu").css('color', 'black');
			$("#crawl-button").html('enter');
			$("#crawl-button").addClass('btn-success');			
		} else if (game.dungeon.crawling && game.dungeon.forward){
			$("#crawl-button").html('exit');
			$("#crawl-button").addClass('btn-danger');
		} else if (game.dungeon.crawling && !game.dungeon.forward){
			$("#crawl-button").html('exiting');
			$("#crawl-button").addClass('btn-warning');
		
		}
		$("#pull").prop('disabled', false);
		
		if (game.player.gold < 1 || ui.wins != null || game.slots.pulling){
			$("#pull").prop('disabled', true);
		}
		$("#autopull").prop('disabled', false);

		if (game.player.gold < 1){
			$("#autopull").prop('disabled', true);
		}
		this.refreshFighting();
		ui.printLog();
		let width = (game.player.health / game.player.maxHealth * 100) + "%"
		$("#healthBar").css('width', width);
        width = (game.player.armor / game.player.maxArmor * 100) + "%"
		$("#armorBar").css('width', width);
		$("#healthBar").removeClass('poisoned');
		if (game.player.poisonCounter > 0){
			$("#healthBar").addClass('poisoned');
		}
	}

	refreshFighting(){
		let caption = ' no one';
		if (game.mob.entity != null){
			let mob = game.mob.entity;
			let width = (mob.health / mob.max * 100).toFixed(0) + "%";			
			let bar = "<div class='progress'><div id='healthBar' " 
				+ "class='progress-bar bg-danger' role='progressbar' "
				+ "style='width: " + width + "'></div></div>";
			caption = "<div> lvl " + mob.level + " " + mob.name + " a: " 
				+ mob.attack + " hp: "+ mob.health + "/" + mob.max
				+ "</div><div>" + bar + "</div>";
		}
		
		$("#fighting").html(caption);
	}
}