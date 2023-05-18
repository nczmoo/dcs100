class Mob {
    entity = null;
    modifiers = new MobModifiers();
    spawning = [];    
    types = new MobTypes();

	constructor(){
		for (let name in this.types.list){
			this.modifiers.values[name] = JSON.parse(JSON.stringify(this.modifiers.template));			
		}
		console.log(this.modifiers);
	}

    dies(){
		let loot = randNum(1, this.entity.attack);
		if (game.dungeon.steps > game.dungeon.lastDive ){
			loot *= 2;
			if (loot < 1){
				loot = 2;
			}
		}
		ui.mobDies(this.entity.name);
		ui.status("The <span class='fw-bold'> " 
			+ this.entity.name + " died</span> and you looted " + loot 
			+ " gold from it. (<span class='text-success='>+" + loot 
			+ " 	<img src='img/icon-gold.png'></span>) ", 'mob');		
		game.player.getGold(loot);		
		if (!this.spawning.includes(this.entity.name)){
			ui.addToMonsters(this.entity.name);
			this.spawning.push(this.entity.name);
		}
		if (game.dungeon.forward){			
			this.modifiers.upgrade(this.entity.name);
			this.entity = null;				
			return;
		}
		this.modifiers.downgrade(this.entity.name);
		this.entity = null;				

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
		for (let attr in this.modifiers.values[this.entity.name]){
			let modifier = this.modifiers.values[this.entity.name][attr];
			this.entity[attr] += modifier;
		}
		this.entity.health = this.entity.max;
		this.entity.name = name;
		ui.mobSpawns(this.entity.name);
		ui.status("<span class='fw-bold'>A " + this.entity.name 
			+ "(a:" + this.entity.attack + " / hp: " + this.entity.max 
			+ ") spawned</span> in front of you.", 'mob')
	}
}