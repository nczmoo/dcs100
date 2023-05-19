class Player {    
	combat = new PlayerCombat();    
	inventory = new PlayerInventory();
	stats = new PlayerStats();
    
    exitsDungeon(){
        this.stats.resetArmor();
		this.stats.resetHealth();
		this.stats.poisonCounter = 0;
    }

    isPoisoned(){
		this.stats.poisonCounter --;		
		if (randNum (1, 2) == 1){
			ui.addToLogs("You took 1 dmg from being poisoned. (<span class='text-danger'>-1 hp</span>)")
			this.stats.health --;
		}
		if (this.stats.health < 1){
			this.combat.die();
		}

	}



    

    
}