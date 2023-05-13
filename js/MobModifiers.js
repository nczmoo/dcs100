class MobModifiers {
    values = {
        attack: 0,
        health: 0,
        max: 0,        
        level: 0,
    }
	
    downgrade(){
		let rand = randNum(1, 3);	
		if (this.values.level < 1){
			return;
		}
		this.values.level--;
		if (rand == 1 && this.values.attack > 1){
			this.values.attack--;			
			return;
		}
		if (this.values.health > 1){
			this.values.health--;
			this.values.max--;
		}
	}

    reset(){
        for (let i in this.values){
			this.values[i] = 0;
		}
    }

    upgrade(){		
		let rand = randNum(1, 3);				
		this.values.level++;
		if (rand == 1){
			this.values.attack++;
			return;
		}
		this.values.health++;
		this.values.max++;
	}
}