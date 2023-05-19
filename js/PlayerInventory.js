class PlayerInventory {
    gold = 0;    
	keys = 0;
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

    resetGold(){
        this.gold = 0;
        game.slots.lines.check();
    }

	useKey(){
		if (this.keys < 1){
			return;
		}
		ui.delta('key', -1);
		this.keys --;
	}
}