class MobTypes {
    list = {
        rat: {attack: 1, health: 2, max: 2, level: 1, steps: 0, },
        rat_king: {attack: 10, health: 40, max: 40, level: 1, steps: 100},
        snake: {attack: 5, health: 10, max: 10, level: 1, steps: 50},
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