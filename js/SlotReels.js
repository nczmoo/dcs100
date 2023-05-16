class SlotReels {
	addToReels = {
        'repair': 50,
        'maxHealth-2': 1,
        'maxHealth-3': 150,
    }
    captions = {
        repair: 'repair potion',
        'maxHealth-2':  '+2 to max health',
        'maxHealth-3':  '+3 to max health',
    }
    length = null;
    numOfReels = 3;
    positions = [];
	symbols = ['weapon', 'maxArmor', 'maxHealth-1', 'heal', 'key'];    
    values = [];	

    constructor(){
        this.length = this.symbols.length;

		this.generate();
	}

    add(){

		if (game.dungeon.steps < game.dungeon.lastDive ){
			return;
		}
		for (let name in this.addToReels){
			let stepReq = this.addToReels[name];

			if (game.dungeon.steps >= stepReq && !this.symbols.includes(name)){
				this.symbols.push(name);
				this.generate();
                ui.status("Because you reached step #" + game.dungeon.steps + ", " + this.captions[name] + " was added to your reel: " 
                    + "<img src='img/reel-" + name + ".png' height='24' width='24'>")
                ui.addToReels(name);
			}
		}
        this.length = this.symbols.length;
	}

    fetch (reelID, pos){
        //console.log(reelID, pos);
        return this.values[reelID][pos];
    }

    fetchPositions(reelID, real){
		let pos = this.positions[reelID];        
		if (!real){
			pos = ui.animation.positions[reelID]; 
		}
		let prev = pos - 1, next = pos + 1;
		if (prev < 0){
			prev = this.length - 1;
		}
		if (next > this.length - 1){
			next = 0;
		}
		return {prev: prev, pos: pos, next: next};
	}

    fetchRandPos(reelID){
        return randNum(0, this.length - 1);
    }

    fetchRandReel(){
        let reel = [];
        while (reel.length < this.length){
            let rand = this.symbols[randNum(0, this.length - 1)];
            if (howMany(reel, rand) < howMany(this.symbols, rand)){
                reel.push(rand)
            }
        }        
        return reel;		
    }
    generate(){
        this.values = [];
        this.positions = [];
        while (this.values.length < this.numOfReels){
            this.values.push(this.fetchRandReel());
            this.positions.push(randNum(0, this.length -1));
        }
    }
}