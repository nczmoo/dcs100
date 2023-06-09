class Dungeon {
	chest = new DungeonChest();
	crawl = new DungeonCrawl();
    crawling = false;
	firstTime = true;
    forward = true;
    lastDive = 10;
    maxSteps = null;    
    spawnRate = 4;
    steps = 0;  
    stepsForward = 0;
	tutorial = "<div class='mb-3'>Get gold!</div><div> But if you die before exiting or drinking a portal potion, you get nothing.</div>";

    constructor(){
		this.chest.generate(this.steps);
        this.resetMaxSteps();        
    }

    back(){
		if (this.forward){
			return;
		}
		game.sound.play('step');
		this.checkLastDive();
		this.steps--;
		if (this.steps < 1){
			this.exit();
			game.sound.play('dungeon-exit');
			game.music.play('outside');
			return true;
		}		
	}

    checkLastDive(){
        if (this.steps > this.lastDive){
			this.lastDive = this.steps;
		}
    }

    exit(){
		ui.event.exit();
		this.crawling = false;
		this.forward = true;		
		this.steps = 0;
		this.chest.generate(this.steps);
		this.firstTime = false;
        game.player.exitsDungeon();
		game.mob.exitsDungeon();	
        this.resetMaxSteps();
			
	}

	fight(){
		
		game.player.combat.hitting = !game.player.combat.hitting ;
		if (game.player.combat.hitting ){
			game.player.combat.hits();
			return;
		}
		game.mob.hits();
	}
	
    resetMaxSteps(){
        this.maxSteps = randNum(this.spawnRate, this.spawnRate * 2); 		
    }
}