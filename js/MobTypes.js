class MobTypes {
    list = {
        rat: {attack: 1, max: 2,  steps: 0, gold: 1}, //CHECK   
        snake: {attack: 3,  max: 5,  steps: 25, gold: 1}, //CHECK   
        rat_king: {attack: 5,  max: 10,  steps: 50, gold: 2},  //CHECK      
        spider: {attack: 10,  max: 20,  steps: 75, gold: 1}, //CHECK   
        snake_queen: {attack: 15,  max: 40,  steps: 100, gold: 1}, //CHECK   
        ghost: {attack: 20,  max: 50,  steps: 125, gold: 1},
        skeleton: {attack: 30,  max: 70,  steps: 150, gold: 1},
        orc: {attack: 50,  max: 100,  steps: 175, gold: 1},
        orc_lord: {attack: 100,  max: 200,  steps: 200, gold: 1},            
        lich: {attack: 250,  max: 500, steps: 225, gold: 1},
        demon: {attack: 500,  max: 1000, steps: 250, gold: 1},
        //{attack: , health: , max: , level: , steps: },
    }


    fetch(name){        
        return JSON.parse(JSON.stringify(this.list[name]));
    }

    fetchSpawnName(){
        let availableSpawn = game.mob.spawning.slice();
		for (let name in this.list){
			let mob = this.list[name];
			if (game.dungeon.steps >= mob.steps && !availableSpawn.includes(name)){
				availableSpawn.push(name);
			}
		}
        return availableSpawn[randNum(0, availableSpawn.length - 1)];
    }
}