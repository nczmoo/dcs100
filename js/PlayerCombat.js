class PlayerCombat {
    chanceToPoison = 15; 
    died = 0;
    hitting = true; //hitting doesn't seem to reset at the end of a fight 

    die(){
		if (game.config.auto.heal && game.player.inventory.potions.heal > 0){
			ui.addToLogs("Just as you're about to fall over, you chug a health potion.");
			game.drink('heal');
			return;
		}
		game.music.play('die');
		game.sound.play('player-die');
		this.died ++;
		
		let msg = "You <span class='fw-bold text-danger'>died</span> " 
			+ game.dungeon.steps 
			+ " steps from the entrance, but, somehow, you were resurrected back"
			+ " at the entrance. (Normally, you lose ALL of your gold, but you "
			+ "only lost 1/2 this time.)";
		if (this.died != 1){
			msg = "You <span class='fw-bold text-danger'>died</span> " 
			+ game.dungeon.steps 
			+ " steps from the entrance, lost " + game.player.inventory.loseGold() 
			+ ", but, somehow, you were resurrected back at the entrance.";
			
		}
		$("#death").html(msg);
		ui.event.die();
		ui.addToLogs(msg);		
		game.dungeon.exit();
		if (this.died == 1){
			game.player.inventory.gold = Math.round(game.player.inventory.gold * .5);
			return;
		}
		//game.player.inventory.resetGold();
	}

    getPoisoned(dmg, name){
        let poisonMsg = "";
		let poisoningMobs = ['snake', 'spider', 'snake_queen'];
		if (dmg > 0 && poisoningMobs.includes(name) && randNum(1, this.chanceToPoison) == 1){
			poisonMsg = " <span class='fw-bold poisoned'>You were poisoned by a " 
                + name + "! </span>";
			game.player.stats.poisonCounter = randNum(1, game.player.stats.health)
		}
        return poisonMsg;
    }

    getsHitInHealth(dmg){
		ui.delta('health', -dmg);
		if (dmg > 0){
			ui.animation.hit('healthProgressBar');
		}
		game.player.stats.health -= dmg;
		if (game.player.stats.health < 1){
			return true;
		}
		return false;
	}

    getsHitInArmor(dmg){
		if (game.player.stats.armor < 1){
			return dmg;
		}
		if (dmg > 0){
			ui.animation.hit('armorProgressBar');
		}
        let armorDmg = 0;
		if (game.player.stats.armor > 0){
			game.player.stats.armor -= dmg;
			armorDmg = dmg;		
		} 
		if (game.player.stats.armor < 0){
			armorDmg = (dmg + game.player.stats.armor);
			dmg = Math.abs(game.player.stats.armor);				
			game.player.stats.armor = 0;
		} 
		if (game.player.stats.armor < 1 && game.config.auto.repair 
			&& game.player.inventory.potions.repair > 0){
			game.drink('repair');
		} else if (game.player.stats.armor < 1 && game.config.autoPauseOnArmor){
			game.paused = true;
		}
		ui.delta('armor', -armorDmg);
        return armorDmg;
    }

    hits(){		
		let dmg = randNum (0, game.player.stats.weapon * 2);
		game.mob.entity.health -= dmg;
		let status = "<span class='fw-bold'>You</span> missed";
		if (dmg < 1){
			game.sound.play('player-miss');
		}
		if (dmg > 0){
			game.sound.play(game.mob.entity.name + '-hit');			
			ui.event.playerHits(game.mob.entity.name);
			
			status = "<span class='fw-bold'>You</span> hit the " 
			+ ui.formatName(game.mob.entity.name) + " for " + dmg + " damage!"
		} else { 
			ui.event.mobSpawns(game.mob.entity.name);

		}
		ui.addToLogs(status);
		if (game.mob.entity.health < 1){
			game.mob.dies();
		}
	}
}