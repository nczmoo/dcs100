class PlayerStats {
    armor = 10;
	health = 10;      
    maxArmor = 10;
    maxHealth = 10;
    poisonCounter = 0;

	weapon = 5;
    resetArmor(){
        this.armor = this.maxArmor;
    }

    resetHealth(){
        this.health = this.maxHealth;
    }
}