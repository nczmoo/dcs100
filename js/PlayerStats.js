class PlayerStats {
    armor = 0;
	health = 0;

    maxArmor = 10;
    maxHealth = 10;
    poisonCounter = 0;
	weapon = 5;

    constructor(){
        this.resetArmor();
        this.resetHealth();
    }

    resetArmor(){
        this.armor = this.maxArmor;
    }

    resetHealth(){
        this.health = this.maxHealth;
    }
}