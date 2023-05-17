class MobTypes {
    list = {
        rat: {attack: 1, health: 2, max: 2, level: 1, steps: 0, },
        snake: {attack: 3, health: 5, max: 5, level: 1, steps: 25},
        rat_king: {attack: 5, health: 10, max: 10, level: 1, steps: 50},        
        spider: {attack: 10, health: 20, max: 20, level: 1, steps: 75},
        snake_queen: {attack: 15, health: 40, max: 40, level: 1, steps: 100},
        ghost: {attack: 20, health: 50, max: 50, level: 1, steps: 125 },
        skeleton: {attack: 30, health: 70, max: 70, level: 1, steps: 150 },
        orc: {attack: 50, health: 100, max: 100, level: 1, steps: 175},
        orc_lord: {attack: 100, health: 200, max: 200, level: 1, steps: 200},            
        lich: {attack: 250, health: 500, max: 500, level: 1, steps: 225},
        demon: {attack: 500, health: 1000, max: 1000, level: 1, steps: 250},
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