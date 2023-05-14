class Dungeon {
	chestEveryMax = 20;
	chestEveryMin = 10;
	chest = null;
	chestFoundAt = null;
    crawling = false;
    forward = true;
    lastDive = 10;
    maxSteps = null;    
    spawnRate = 4;
    steps = 0;  
    stepsForward = 0;

    constructor(){
		this.generateChest();
        this.resetMaxSteps();        
    }

    back(){
		if (this.forward){
			return;
		}
		this.checkLastDive();
		this.steps--;
		if (this.steps < 1){
			this.exit();
			return true;
		}		
	}

	changeCrawling(){
		if (!this.crawling){
			ui.clearUIBeforeCrawl();
			this.crawling = true;		
			return;
		} 	
		if (this.forward){
			this.forward = false;	
			return;
		}
		this.forward = true;
	}

    checkLastDive(){
        if (this.steps > this.lastDive){
			this.lastDive = this.steps;
		}
    }

    crawl(){
		if (game.mob.entity != null){
			this.fight();
			return;
		}		
		
		if (this.chestFoundAt == this.steps){
			ui.chestFound();			
			this.openChest();
			return;
		}
				
		ui.animation.step();
		if (game.player.poisonCounter > 0){
			game.player.isPoisoned();
		}
		if (this.forward){
			this.steps ++;
			this.stepsForward ++;
			game.slots.reels.add();
		}  
		if (this.back()){
			return;
		}
		let modifier = 1;
		if (!this.forward){
			modifier = 2;
		}
		let spawn = randNum(1, this.spawnRate * modifier) == 1 
			|| (this.forward && this.stepsForward >= this.maxSteps);
		if (spawn){
			this.maxSteps++; //remember that steps forward is reset to 0 after this
			this.stepsForward = 0;
			game.mob.spawn();			
		}

	}

    exit(){
		ui.exit();
		this.crawling = false;
		this.forward = true;
		this.steps = 0;
		this.generateChest();

        game.player.exitsDungeon();
		game.mob.exitsDungeon();	
        this.resetMaxSteps();
			
	}

	fight(){
		ui.mobSpawns(game.mob.entity.name);
		game.player.hitting = !game.player.hitting ;
		if (game.player.hitting ){
			game.player.hits();
			return;
		}
		game.mob.hits();
	}
	
	generateChest(){
		this.chestFoundAt = this.steps + randNum(this.chestEveryMin, this.chestEveryMax);
		let rand  = randNum(1, 4);
		if (rand == 1){
			this.chest = 'portal';
			return;
		}
		this.chest = 'gold';
	}

	openChest(){
		if (this.chest == 'open' || !game.player.canUseKey()){
			this.chest = null;
			this.generateChest();
			return;
		}

		let chests = { gold: 'gold', portal: 'blue' };
		let msg = "<span class='fw-bold'>You used a key on this " + chests[this.chest] + " chest and found ";
		game.player.useKey();
		if (this.chest == 'gold'){
			let loot = randNum(1, this.steps);
			ui.delta('gold', loot);
			game.player.gold += loot;
			msg += loot  + " gold!";
		} else if (this.chest == 'portal'){
			ui.delta('portal', 1);
			game.player.potions.portal++;
			msg += " a portal potion!";
		}
		ui.status(msg + "</span>");
		this.chest = 'open';			

	}

    resetMaxSteps(){
        this.maxSteps = randNum(this.spawnRate, this.spawnRate * 2); 		
    }
}