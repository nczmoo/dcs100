class Mob {
    entity = null;
    modifiers = new MobModifiers();
    spawning = [];    
    types = new MobTypes();

	constructor(){
		for (let name in this.types.list){
			this.modifiers.values[name] = JSON.parse(JSON.stringify(this.modifiers.template));			
		}
	}

    dies(){
		game.sound.play(this.entity.name + "-die");
		let loot = randNum(1, this.entity.attack * this.entity.gold);
		if (game.dungeon.steps > game.dungeon.lastDive ){
			loot *= 2;
			if (loot < 1){
				loot = 2;
			}
		}
		ui.event.mobDies(this.entity.name);
		ui.addToLogs("The <span class='fw-bold'> " 
			+ ui.formatName(this.entity.name) + " died</span> and you looted " + loot 
			+ " gold from it. (<span class='text-success='>+" + loot 
			+ " 	<img src='img/icon-gold.png'></span>) ", 'mob');		
		game.player.inventory.getGold(loot);		
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
			game.sound.play('player-miss');
		}
		if (dmg > 0 ){
			game.sound.play('player-hit');
		}

        let armorDmg = game.player.combat.getsHitInArmor(dmg);
		dmg -= armorDmg;
		let playerDied = game.player.combat.getsHitInHealth(dmg);		

		let armorCaption = " Your armor was hit for " + armorDmg 
			+ " damage. (<span class='text-danger'>-" + armorDmg + "</span>)";
		let healthCaption = " Your health was hit for " + dmg 
			+ " damage. (<span class='text-danger'>-" + dmg +  "</span>)";
		let status = ui.formatName(this.entity.name) + " missed!";
		
		if (initDmg > 0){
			ui.event.mobHits(this.entity.name);
			status = "The " + ui.formatName(this.entity.name) 
			+ " hit you for " + initDmg 
			+ " damage." ;
		} else {
			ui.event.mobMiss(this.entity.name);
			game.sound.play('player-miss');
		}
        let poisonMsg = game.player.combat.getPoisoned(dmg, this.entity.name);
		if (armorDmg > 0){
			status += armorCaption;
		}
		if (dmg > 0){
			status += healthCaption;
		}
        status += poisonMsg;
		ui.addToLogs(status, 'mob');
		if (playerDied){
			game.player.combat.die();
		}
	}

    spawn(){		
		if (this.entity != null){
			return;
		}		
		let name = this.types.fetchSpawnName();
		game.sound.play(name + "-spawn");
		let mob =  JSON.parse(JSON.stringify(this.types.fetch(name)));
		this.entity = mob;			
		for (let attr in this.modifiers.values[name]){
			let modifier = this.modifiers.values[name][attr];
			this.entity[attr] += modifier;
		}
		this.entity.health = this.entity.max;
		this.entity.name = name;
		ui.event.mobSpawns(this.entity.name);
		ui.addToLogs("<span class='fw-bold'>A " + ui.formatName(this.entity.name)
			+ "(a:" + this.entity.attack + " / hp: " + this.entity.max 
			+ ") spawned</span> in front of you.", 'mob')
	}
}