class Game{
	config = new Config();		
	loopInterval = setInterval(this.looping, 750); //1000 or 500
	dungeon = new Dungeon();
    player = new Player();
    mob = new Mob();
    slots = new Slots();
	sound = new Sound();
	
	constructor(){
	}

	autopull(){
		this.slots.pulling = !this.slots.pulling;
	}

	changeAuto(name, val){		
		this.config.auto[name] = val;
	}

	drink(potion){ // might need to reorient this as inventory not potions
		if (this.player.inventory.potions[potion] < 1){
			return;
		}
		this.sound.play('drink');
		ui.delta(potion, -1);
		this.player.inventory.potions[potion] --;
		if (potion == 'repair'){
			this.player.stats.resetArmor();
			ui.addToLogs("You repair your armor back to full!");
		} else if (potion == 'heal'){
			this.player.stats.resetHealth();
			let msg = "You heal yourself back to full!";
			if (game.player.stats.poisonCounter > 0){
				game.player.stats.poisonCounter = 0;
				msg += " (You cureed your poison too!)"
			}
			ui.addToLogs(msg);
		} else if (potion == 'portal'){
			this.dungeon.checkLastDive();
			this.dungeon.exit();
			ui.addToLogs('You open a portal and exit the dungeon.');
		}
	}

	looping(){
		if (game.dungeon.crawling){
			game.dungeon.crawl.go();
			ui.print.deltas();
		} else if (game.slots.pulling){
			game.slots.pull();
			return;
		}
		ui.refresh();
	}

	soundConfig(){
		console.log('HELLO');
		this.config.sound = !this.config.sound;
		ui.refresh();
	}

}
