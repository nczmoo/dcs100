class Game{
	config = new Config();		
	loopInterval = setInterval(this.looping, 750); //1000 or 500
	dungeon = new Dungeon();
    player = new Player();
    mob = new Mob();
    slots = new Slots();

	constructor(){
	}

	autopull(){
		this.slots.pulling = !this.slots.pulling;
	}

	changeAuto(name, val){		
		this.config.auto[name] = val;
	}

	drink(potion){ // might need to reorient this as inventory not potions
		if (this.player.potions[potion] < 1){
			return;
		}
		this.player.potions[potion] --;
		if (potion == 'repair'){
			this.player.resetArmor();
			ui.status("You repair your armor back to full!");
		} else if (potion == 'heal'){
			this.player.resetHealth();
			ui.status("You heal yourself back to full!")
		} else if (potion == 'portal'){
			this.dungeon.checkLastDive();
			this.dungeon.exit();
			ui.status('You open a portal and exit the dungeon.');
		}
	}

	looping(){
		if (game.dungeon.crawling){
			game.dungeon.crawl();
		} else if (game.slots.pulling){
			game.slots.pull();
			return;
		}
		ui.refresh();
	}






}
