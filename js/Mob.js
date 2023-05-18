class Mob {
    entity = null;
    modifiers = new MobModifiers();
    spawning = [];    
    types = new MobTypes();

    dies(){
		let loot = randNum(1, this.entity.attack);
		if (game.dungeon.steps > game.dungeon.lastDive ){
			loot *= 2;
			if (loot < 1){
				loot = 2;
			}
		}
		ui.mobDies(this.entity.name);
		ui.status("The <span class='fw-bold'>lvl " + this.entity.level + " " 
			+ this.entity.name + " died</span> and you looted " + loot 
			+ " gold from it. (<span class='text-success='>+" + loot 
			+ " 	<img src='img/icon-gold.png'></span>) ", 'mob');		
		game.player.getGold(loot);		
		if (!this.spawning.includes(this.entity.name)){
			ui.addToMonsters(this.entity.name);
			this.spawning.push(this.entity.name);
		}
		this.entity = null;				
		if (game.dungeon.forward){			
			this.modifiers.upgrade();
			return;
		}
		this.modifiers.downgrade();
	}

    exitsDungeon(){
        this.entity = null;
		this.modifiers.reset();
    }

    hits(){
		let dmg = randNum (0, this.entity.attack);
		let initDmg = dmg;
		if (dmg < 0){
			dmg = 0;
		}
        let armorDmg = game.player.getsHitInArmor(dmg);
		dmg -= armorDmg;
		let playerDied = game.player.getsHitInHealth(dmg);		

		let armorCaption = " Your armor was hit for " + armorDmg 
			+ " damage. (<span class='text-danger'>-" + armorDmg + "</span>)";
		let healthCaption = " Your health was hit for " + dmg 
			+ " damage. (<span class='text-danger'>-" + dmg +  "</span>)";
		let status = this.entity.name + " missed!";
		if (initDmg > 0){
			ui.mobHits(this.entity.name);
			status = "The " + this.entity.name 
			+ " hit you for " + initDmg 
			+ " damage." ;
		}
        let poisonMsg = game.player.getPoisoned(dmg, this.entity.name);
		if (armorDmg > 0){
			status += armorCaption;
		}
		if (dmg > 0){
			status += healthCaption;
		}
        status += poisonMsg;
		ui.status(status, 'mob');
		if (playerDied){
			game.player.die();
		}
	}

    spawn(){		
		if (this.entity != null){
			return;
		}		
		let name = this.types.fetchSpawnName();
		let mob =  JSON.parse(JSON.stringify(this.types.fetch(name)));
		this.entity = mob;	
		for (let i in this.modifiers.values){
			let modifier = this.modifiers.values[i];
			this.entity[i] += modifier;
		}
		this.entity.name = name;
		ui.mobSpawns(this.entity.name);
		ui.status("<span class='fw-bold'>A lvl " 
			+ this.entity.level + " " + this.entity.name 
			+ "(a:" + this.entity.attack + " / hp: " + this.entity.max 
			+ ") spawned</span> in front of you.", 'mob')
	}
}