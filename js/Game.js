class Game{
	config = new Config();	

	loopInterval = setInterval(this.looping, 750); //1000 or 500

	constructor(){
	}

	autopull(){
		this.config.pulling = !this.config.pulling;
	}

	addToSlots(){
		if (this.config.steps < this.config.lastDive ){
			return;
		}
		for (let name in this.config.addToReels){
			let stepReq = this.config.addToReels[name];
			if (this.config.steps >= stepReq && !this.config.reelSymbols.includes(name)){
				this.config.reelSymbols.push(name);
				this.config.generateReels();
			}
		}
	}

	back(){
		if (this.config.forward){
			return;
		}
		if (this.config.steps > this.config.lastDive){
			this.config.lastDive = this.config.steps;
		}
		this.config.steps--;
		if (this.config.steps < 1){
			this.exit();
			return true;
		}		
	}

	changeAuto(name, val){		
		this.config.auto[name] = val;
	}

	crawl(){
		if (this.config.mob != null){
			this.fight();
			return;
		}
		ui.step();
		if (this.config.poisonCounter > 0){
			this.isPoisoned();
		}
		if (this.config.forward){
			this.config.steps ++;
			this.config.stepsForward ++;
			this.addToSlots();
		}  
		if (this.back()){
			return;
		}
		let modifier = 1;
		if (!this.config.forward){
			modifier = 2;
		}
		let spawn = randNum(1, this.config.spawnRate * modifier) == 1 
			|| (this.config.forward && this.config.stepsForward >= this.config.maxSteps);
		if (spawn){
			this.config.maxSteps++;
			this.config.stepsForward = 0;
			this.spawn();			
		}

	}

	die(){
		if (this.config.auto.heal && this.config.potions.heal > 0){
			ui.status("Just as you're about to fall over, you chug a health potion.");
			this.drink('heal');
			return;
		}
		let msg = "You <span class='fw-bold text-danger'>died</span> " 
		+ this.config.steps 
		+ " steps from the entrance, lost all your gold (" + this.config.gold 
		+ "), but, somehow, you were ressurected back at the entrance.";
		$("#death").html(msg);
		ui.status(msg);
		this.config.resetGold();
		this.exit();
	}

	downgradeMob(){
		let rand = randNum(1, 3);	
		if (this.config.modifiers.level < 1){
			return;
		}
		this.config.modifiers.level--;
		if (rand == 1 && this.config.modifiers.attack > 1){
			this.config.modifiers.attack--;			
			return;
		}
		if (this.config.modifiers.health > 1){
			this.config.modifiers.health--;
			this.config.modifiers.max--;
		}
	}

	drink(potion){
		if (this.config.potions[potion] < 1){
			return;
		}
		this.config.potions[potion] --;
		if (potion == 'repair'){
			this.config.resetArmor();
			ui.status("You repair your armor back to full!");
		} else if (potion == 'heal'){
			this.config.resetHealth();
			ui.status("You heal yourself back to full!")
		} else if (potion == 'portal'){
			if (this.config.steps >= this.config.lastDive){
				this.config.lastDive = this.config.steps;
			}
			this.exit();
			ui.status('You open a portal and exit the dungeon.');
		}
	}

	exit(){
		ui.exit();
		this.config.crawling = false;
		this.config.forward = true;
		this.config.steps = 0;
		this.config.resetArmor();
		this.config.resetHealth();
		this.config.resetMaxSteps();
		this.config.mob = null;
		for (let i in this.config.modifiers){
			this.config.modifiers[i] = 0;
		}
		
	}

	fetchPositions(reelID, real){
		let pos = this.config.positions[reelID];
		if (!real){
			pos = ui.positions[reelID]; 
		}
		let prev = pos - 1, next = pos + 1;
		if (prev < 0){
			prev = this.config.reelSymbols.length - 1;
		}
		if (next > this.config.reelSymbols.length - 1){
			next = 0;
		}
		return {prev: prev, pos: pos, next: next};
	}

	fetchWins(){
		let reels = [];
		for (let reelID in this.config.reels){
			let positions = this.fetchPositions(reelID, true);
			reels.push(positions);
		}
		let wins = [];
		for (let winID in this.config.wins){
			let win = this.config.wins[winID];
			if (this.config.reels[0][reels[0][win[0]]] 
				== this.config.reels[1][reels[1][win[1]]] 
				&& this.config.reels[0][reels[0][win[0]]] 
				== this.config.reels[2][reels[2][win[2]]]){
				wins.push(Number(winID));
			}
			
		}
		this.processWins(wins);		
		ui.animateWins(wins);
	}

	fight(){
		ui.mobSpawns(this.config.mob.name);
		this.config.yourTurn = !this.config.yourTurn;
		if (this.config.yourTurn){
			this.playerHits();
			return;
		}
		this.mobHits();
	}

	insert(delta){
		delta = Number(delta);
		if (this.config.gold < delta){
			return;
		}

		this.config.gold -= delta;
		this.config.credits += delta;
	}

	isPoisoned(){
		this.config.poisonCounter --;		
		if (randNum (1, 2) == 1){
			ui.status("You took 1 dmg from being poisoned. (<span class='text-danger'>-1 hp</span>)")
			this.config.health --;
		}
		if (this.config.health < 1){
			this.die();
		}
	}

	lines(delta){
		if ((delta == 'more' && (this.config.gold == 0 || this.config.lines == this.config.gold || this.config.lines >= this.config.maxLines)) 
		|| (delta == 'less' && this.config.lines == 1)){
			return;
		}
		if (delta == 'more'){
			this.config.lines ++;
			return;
		}
		this.config.lines --;
	}

	looping(){
		if (game.config.crawling){
			game.crawl();
		} else if (game.config.pulling){
			game.pull();
			return;
		}
		ui.refresh();


	}

	mobDies(){
		let loot = randNum(this.config.mob.attack, this.config.mob.level);
		if (this.config.steps > this.config.lastDive ){
			loot *= 2;
			if (loot < 1){
				loot = 2;
			}
		}
		ui.mobDies(this.config.mob.name);
		ui.status("The <span class='fw-bold'>lvl " + this.config.mob.level + " " 
			+ this.config.mob.name + " died</span> and you looted " + loot 
			+ " gold from it. (<span class='text-success='>+" + loot 
			+ " 	gold</span>) ", 'mob');		
		this.config.getGold(loot);
		if (!this.config.dungeon.includes(this.config.mob.name)){
			this.config.dungeon.push(this.config.mob.name);
		}
		this.config.mob = null;		
		
		if (this.config.forward){			
			this.upgradeMob();
			return;
		}
		this.downgradeMob();
	}

	mobHits(){
		let dmg = randNum (0, this.config.mob.attack);
		let initDmg = dmg;
		if (dmg < 0){
			dmg = 0;
		}

		let armorDmg = 0;
		if (this.config.armor > 0){
			this.config.armor -= dmg;
			armorDmg = dmg;		
		} 
		if (this.config.armor < 0){
			armorDmg = (dmg + this.config.armor);
			dmg = Math.abs(this.config.armor);				
			this.config.armor = 0;
		} 
		dmg -= armorDmg;
		
		this.config.health -= dmg;
		let armorCaption = " Your armor was hit for " + armorDmg 
			+ " damage. (<span class='text-danger'>-" + armorDmg + "</span>)";
		let healthCaption = " Your health was hit for " + dmg 
			+ " damage. (<span class='text-danger'>-" + dmg +  "</span>)";
		let status = this.config.mob.name + " missed!";
		if (initDmg > 0){
			ui.mobHits(this.config.mob.name);
			status = "The " + this.config.mob.name 
			+ " hit you for " + initDmg 
			+ " damage." ;
		}
		let poisonMsg = "";
		if (initDmg > 0 && this.config.mob.name == 'snake' && randNum(1, this.config.chanceToPoison) == 1){
			poisonMsg = " You were poisoned by a " + this.config.mob.name + "! ";
			this.config.poisonCounter = randNum(1, this.config.health)
		}
		if (armorDmg > 0){
			status += armorCaption;
		}
		if (dmg > 0){
			status += healthCaption;
		}
		ui.status(status, 'mob');
		if (this.config.health < 1){
			this.die();
		}
	}

	playerHits(){		
		let dmg = randNum (0, this.config.weapon * 2);
		this.config.mob.health -= dmg;
		let status = "<span class='fw-bold'>You</span> missed";
		if (dmg > 0){
			ui.playerHits(this.config.mob.name);
			status = "<span class='fw-bold'>You</span> hit the " 
			+ this.config.mob.name + " for " + dmg + " damage!"
		}
		ui.status(status);
		if (this.config.mob.health < 1){
			this.mobDies();
		}
	}

	processWins(wins){
		let winsPaid = 0;
		this.config.checkLines();
		if(wins.length < 1){
			return;
		}					
		let positions = this.fetchPositions(0, true);
		for (let winID of wins){			
			let what = this.config.reels[0][positions[this.config.wins[winID][0]]];		
			let pay = this.config.lines;			
			if (winsPaid >= this.config.lines){
				return;
			}
			winsPaid ++;			
			if (what.split('-')[0] == 'maxHealth'){
				this.config.maxHealth += Number(what.split('-')[1]) * pay;
				this.config.resetHealth();
				continue;
			} else if (this.config.potionList.includes(what)){
				if (ui.potionsHidden){
					ui.potionsHidden = false;
				}
				this.config.potions[what] += pay;
				continue;
			}				
			this.config[what] += pay;			
			this.config.resetArmor();
		}
	}

	pull(){
		this.config.checkLines();
		if (this.config.gold < 1 || ui.animationHappening || ui.pulledAt != null ){			
			return;
		}
		ui.pulledAt = Date.now();
		this.config.gold -= this.config.lines;
		if (this.config.gold > 0 && this.config.gold < this.config.lines){
			this.config.lines = this.config.gold;
		}
		if (this.config.gold < 1){
			this.config.pulling = false;
			this.config.gold = 0;
			this.config.lines = 1;
		}
		for (let i in this.config.positions){
			let rand = null;
			while (1){

				rand = randNum(0, this.config.reels[i].length - 1);
				if (rand != this.config.positions[i]){
					break;
				}
			}
			this.config.positions[i] = rand;
		}
		this.fetchWins();
	}

	spawn(){		
		if (this.config.mob != null){
			return;
		}
		let dungeon = game.config.dungeon;
		for (let name in this.config.mobs){
			let mob = this.config.mobs[name];
			if (this.config.steps >= mob.steps && !dungeon.includes(name)){
				dungeon.push(name);
			}
		}
		let name = dungeon[randNum(0, dungeon.length - 1)];
		let mob = { ...this.config.mobs[name]};
		this.config.mob = mob;
		for (let i in this.config.modifiers){
			let modifier = this.config.modifiers[i];
			this.config.mob[i] += modifier;
		}
		this.config.mob.name = name;
		ui.mobSpawns(this.config.mob.name);
		ui.status("<span class='fw-bold'>A lvl " 
			+ this.config.mob.level + " " + this.config.mob.name 
			+ "(a:" + this.config.mob.attack + " / hp: " + this.config.mob.max 
			+ ") spawned</span> in front of you.", 'mob')
	}

	upgradeMob(){
		
		let rand = randNum(1, 3);				
		this.config.modifiers.level++;
		if (rand == 1){
			this.config.modifiers.attack++;
			return;
		}
		this.config.modifiers.health++;
		this.config.modifiers.max++;
	}


}
