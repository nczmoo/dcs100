class MobModifiers {
	values = {};
    template = {
        attack: 0,
        health: 0,
        max: 0,        
    };
	
    downgrade(name){
		let rand = randNum(1, 3);	

		if (rand == 1 && this.values[name].attack > 1){
			this.values[name].attack--;			
			return;
		}
		if (this.values[name].health > 1){
			this.values[name].health--;
			this.values[name].max--;
		}
	}

    reset(){
		for (let name in this.values){
			let mob = this.values[name];
			for (let attr in mob){
				this.values[name][attr] = 0;
			}
		}
    }

    upgrade(name){		
		let rand = randNum(1, 3);				
		if (rand == 1){
			this.values[name].attack++;
			return;
		}
		this.values[name].health++;
		this.values[name].max++;
	}
}