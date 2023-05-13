class Player {
    armor = 0;
    chanceToPoison = 100;    
    gold = 0;    
    goldInRun = 0;
	health = 10;   
    maxArmor = 0;
    maxHealth = 10;
    poisonCounter = 0;
    weapon = 1; //1
	potionList = ['heal', 'portal', 'repair', 'key'];
    potions = {};

    hitting = true; //hitting doesn't seem to reset at the end of a fight

	constructor(){
		for (let name of this.potionList){
            this.potions[name] = 0;
        }
	}

	canUseKey(){
		if (game.dungeon.chest == null || this.potions.key < 1){
			return false;
		}
		return (game.dungeon.chest == 'portal' && game.config.auto.key_portal) 
			|| (game.dungeon.chest == 'gold' && game.config.auto.key_gold) ;
		
	}

    die(){
		if (game.config.auto.heal && this.potions.heal > 0){
			ui.status("Just as you're about to fall over, you chug a health potion.");
			game.drink('heal');
			return;
		}
		let msg = "You <span class='fw-bold text-danger'>died</span> " 
		+ game.dungeon.steps 
		+ " steps from the entrance, lost all your gold (" + this.gold 
		+ "), but, somehow, you were ressurected back at the entrance.";
		$("#death").html(msg);
		ui.status(msg);
		this.resetGold();
		game.dungeon.exit();
	}

    exitsDungeon(){
        this.resetArmor();
		this.resetHealth();
    }

    getGold(delta){        
        this.gold += delta;
        this.goldInRun += delta;
        game.slots.checkLines();
        if (this.gold > 0 && ui.menuHidden){
            $("#menu").removeClass('d-none');
            ui.menuHidden = false;
        }
    }

    getPoisoned(dmg, name){
        let poisonMsg = "";
		if (dmg > 0 && name == 'snake' && randNum(1, this.chanceToPoison) == 1){
			poisonMsg = " <span class='fw-bold'>You were poisoned by a " 
                + name + "! </span>";
			this.poisonCounter = randNum(1, this.health)
		}
        return poisonMsg;
    }

	getsHitInHealth(dmg){
		this.health -= dmg;
		if (this.health < 1){
			return true;
		}
		return false;
	}

    getsHitInArmor(dmg){
        let armorDmg = 0;
		if (this.armor > 0){
			this.armor -= dmg;
			armorDmg = dmg;		
		} 
		if (this.armor < 0){
			armorDmg = (dmg + this.armor);
			dmg = Math.abs(this.armor);				
			this.armor = 0;
		} 
        return armorDmg;
    }

    isPoisoned(){
		this.poisonCounter --;		
		if (randNum (1, 2) == 1){
			ui.status("You took 1 dmg from being poisoned. (<span class='text-danger'>-1 hp</span>)")
			this.health --;
		}
		if (this.health < 1){
			this.die();
		}
	}

    hits(){		
		let dmg = randNum (0, this.weapon * 2);
		game.mob.entity.health -= dmg;
		let status = "<span class='fw-bold'>You</span> missed";
		if (dmg > 0){
			ui.playerHits(game.mob.entity.name);
			status = "<span class='fw-bold'>You</span> hit the " 
			+ game.mob.entity.name + " for " + dmg + " damage!"
		}
		ui.status(status);
		if (game.mob.entity.health < 1){
			game.mob.dies();
		}
	}

    resetArmor(){
        this.armor = this.maxArmor;
    }

    resetGold(){
        this.gold = 0;
        game.slots.checkLines();
    }

    resetHealth(){
        this.health = this.maxHealth;
    }

	useKey(){
		if (this.potions.key < 1){
			return;
		}
		this.potions.key --;
	}

    
}