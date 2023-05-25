class PlayerInventory {
	losing = 1;	
    gold = 0;    
	keys = 0;
	minLosing = .5;
	potionList = ['heal', 'portal', 'repair'];
    potions = {};

    constructor(){
		for (let name of this.potionList){
            this.potions[name] = 0;
        }
	}

    canUseKey(){
		if (game.dungeon.chest.value == null || this.keys < 1){
			return false;
		}
		return (game.dungeon.chest.value == 'portal' && game.config.auto.key_portal) 
			|| (game.dungeon.chest.value == 'gold' && game.config.auto.key_gold) ;
		
	}
	getGold(delta){        
		ui.delta('gold', delta);
        this.gold += delta;		
        game.slots.lines.check();
    }

	loseGold(){
		
		let loss = Math.round(this.gold * this.losing);
		let caption = ' all of your gold (';
		if (this.losing != 1 && loss == this.gold && this.gold > 1){
			loss = this.gold - 1;
		}
		if (loss != this.gold){
			caption = ' some of your gold ('
		}
		this.gold -= loss;
		caption += "<span class='text-danger'>-" + loss + " gold</span>) ";
		return caption;
		
	}

	loseLessGold(steps){
		if (this.losing <= this.minLosing){
			return;
		}
		let degree = Math.floor(steps / 100);
		let delta = .1;
		let newLosing = 1 - (delta * degree);
		if (newLosing >= this.losing){
			return;
		}		
		this.losing -= delta;
		ui.addToLogs("Because you reached " + steps 
			+ " steps into the dungeon, you will now only lose " 
			+ (this.losing * 100) + "% of your gold when you die in the future!");
		if (this.losing < this.minLosing){
			this.losing = this.minLosing;
		}
	}

    resetGold(){
        this.gold = 0;
        game.slots.lines.check();
    }

	useKey(){
		if (this.keys < 1){
			return;
		}
		game.sound.play('use-key');
		ui.delta('key', -1);
		this.keys --;
	}
}