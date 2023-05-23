class Game{
	config = new Config();		
	loopInterval = setInterval(this.looping, 750); //1000 or 500
	dungeon = new Dungeon();
    player = new Player();
    mob = new Mob();
	music = new Music(this.config.musicVolume);
    slots = new Slots();
	sound = new Sound();
	lore = ["You finally made it to one of the greatest dungeons in the land.",
	"You trekked through the desert and jungle.",
	"Sailed across three seas to get here.",
	"All of the other dungeons are filled with adventurers seeking their fortune, but this dungeon is all yours!",
	"They say even the rats have gold.",
	"You're going to gamble it all away anyways, but who cares?",
	"Life's a gamble and you're trying to win every jackpot you can before you go bust."];
	
	constructor(){
		//this.music.play('outside');
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
			game.music.play('outside');
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

	musicConfig(){
		this.music.onOrOff();
		ui.refresh();
	}

	soundConfig(){
		console.log('hello?');
		this.config.sound = !this.config.sound;
		ui.refresh();
	}

	story(){
		
		if (ui.introDelay != null && Date.now() - ui.introDelay < 250){
			return;
		}
		ui.introDelay = Date.now();
		if (ui.intro){
			ui.animation.intro.introStoryArrPointer++;
			return;
		}
				
		if (ui.introFading){
			ui.introFading = false;
		}
		$("#story").addClass('d-none');
	}

}
