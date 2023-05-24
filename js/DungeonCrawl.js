class DungeonCrawl {
	musicStarted = false;
    change(){
		if (!game.dungeon.crawling){
			ui.clearUIBeforeCrawl();
			game.sound.play('dungeon-enter');
			let song = 'dungeon';
			if (game.dungeon.firstTime){
				song = 'theme';
			}
			game.music.play(song);
			game.dungeon.crawling = true;		
			return;
		} 	
		if (game.dungeon.forward){
			game.dungeon.forward = false;	
			return;
		}
		game.dungeon.forward = true;
	}

    go(){
		if (game.mob.entity != null){
			game.dungeon.fight();
			return;
		}		
		
		if (game.dungeon.chest.foundAt == game.dungeon.steps){
			ui.event.chestFound();			
			game.dungeon.chest.open(game.dungeon.steps);
			return;
		}
				
		ui.event.step();
		if (game.player.stats.poisonCounter > 0){
			game.player.isPoisoned();
		}
		if (game.dungeon.forward){			
			game.sound.play('step');
			game.dungeon.steps ++;
			game.dungeon.stepsForward ++;
			game.player.inventory.loseLessGold(game.dungeon.steps);
		}  
		if (game.dungeon.back()){

			
			return;
		}
		let modifier = 1;
		if (!game.dungeon.forward){
			modifier = 2;
		}
		let spawn = randNum(1, game.dungeon.spawnRate * modifier) == 1 
			|| (game.dungeon.forward && game.dungeon.stepsForward >= game.dungeon.maxSteps);
		


		if (spawn){
			//game.dungeon.maxSteps++; //remember that steps forward is reset to 0 after game.dungeon
			game.dungeon.stepsForward = 0;
			game.mob.spawn();
		}
		

	}
}