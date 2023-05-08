class Game{
	config = new Config();	
	loopInterval = setInterval(this.looping, 1000);
	constructor(){
		
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

	crawl(){
		if (this.config.mob != null){
			this.fight();
			return;
		}
		if (this.config.forward){
			this.config.steps ++;
			this.config.stepsForward ++;
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
		ui.status("You <span class='fw-bold text-danger'>died</span> " 
			+ this.config.steps 
			+ " steps from the entrance, lost all your gold (" + this.config.gold 
			+ "), but, somehow, you were ressurected back at the entrance.");
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
		if (potion == 'heal'){
			this.config.resetHealth();
			ui.status("You heal yourself back to full!")
		} else if (potion == 'portal'){
			this.exit();
			ui.status('You open a portal and exit the dungeon.');
		}
	}

	exit(){
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

	fetchPositions(reelID){
		let pos = this.config.positions[reelID], prev = pos - 1, next = pos + 1;
		if (prev < 0){
			prev = this.config.numOfSymbolsOnReel - 1;
		}
		if (next == this.config.numOfSymbolsOnReel){
			next = 0;
		}
		return {prev: prev, pos: pos, next: next};
	}

	fetchWins(){
		let reels = [];
		for (let reelID in this.config.reels){
			let positions = this.fetchPositions(reelID);
			reels.push(positions);
		}
		let wins = [];
		for (let winID in this.config.wins){
			let win = this.config.wins[winID];
			if (this.config.reels[0][reels[0][win[0]]] 
				== this.config.reels[1][reels[1][win[1]]] 
				&& this.config.reels[0][reels[0][win[0]]] 
				== this.config.reels[2][reels[2][win[2]]]){
				wins.push(winID);
			}
			
		}
		this.processWins(wins);		
		ui.animateWins(wins);
	}

	fight(){
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

	lines(delta){
		if ((delta == 'more' && (this.config.gold == 0 || this.config.lines == this.config.gold)) 
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
		}
		ui.refresh();
	}

	mobDies(){
		let loot = randNum(0, this.config.mob.level);
		if (this.config.steps > this.config.lastDive ){
			loot *= 2;
			if (loot < 1){
				loot = 2;
			}
		}
		ui.status("The <span class='fw-bold'>lvl " + this.config.mob.level + " " 
			+ this.config.mob.name + " died</span> and you looted " + loot 
			+ " gold from it. (<span class='text-success='>+" + loot 
			+ " 	gold</span>) ", 'mob');		
		this.config.getGold(loot);
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
			status = "The " + this.config.mob.name 
			+ " hit you for " + initDmg 
			+ " damage." ;
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
			status = "<span class='fw-bold'>You</span> hit the " 
			+ this.config.mob.name + " for " + dmg + " damage!"
		}
		ui.status(status);
		if (this.config.mob.health < 1){
			this.mobDies();
		}
	}

	processWins(wins){
		this.config.checkLines();
		if(wins.length < 1){
			return;
		}
		let what = this.config.reels[1][this.config.positions[1]];
		let pay = wins.length;
		if (pay > this.config.lines){
			pay = this.config.lines;
		}
		if (what == 'heal' || what == 'portal'){
			if (ui.potionsHidden){
				ui.potionsHidden = false;
			}
			this.config.potions[what] += pay;
			return;
		}		

		this.config[what] += pay;
		this.config.resetHealth();
		this.config.resetArmor();
		
	}

	pull(){
		this.config.checkLines();
		if (this.config.gold < 1){
			return;
		}
		this.config.gold -= this.config.lines;
		for (let i in this.config.positions){
			let rand = null;
			while (1){
				rand = randNum(0, this.config.reels[i].length - 1);
				if (rand != this.config.positions[i], rand){
					break;
				}
			}
			this.config.positions[i] = rand;
		}
		this.fetchWins();
		ui.printReels();
	}

	spawn(){		
		if (this.config.mob != null){
			return;
		}
		let name = 'rat';
		let mob = { ...this.config.mobs[name]};
		this.config.mob = mob;
		for (let i in this.config.modifiers){
			let modifier = this.config.modifiers[i];
			this.config.mob[i] += modifier;
		}
		this.config.mob.name = name;
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
