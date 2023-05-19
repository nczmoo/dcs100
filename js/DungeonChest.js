class DungeonChest {
    chestEveryMax = 20;
	chestEveryMin = 10;
	value = null;
	foundAt = null;
    generate(steps){
		this.foundAt = steps + randNum(this.chestEveryMin, this.chestEveryMax);
		let rand  = randNum(1, 4);
		if (rand == 1){
			this.value = 'portal';
			return;
		}
		this.value = 'gold';
	}

	open(steps){
		if (this.value == 'open' || !game.player.inventory.canUseKey()){
			this.value = null;
			this.generate(steps);
			return;
		}
		game.sound.play('chest-open');
		let chests = { gold: 'gold', portal: 'blue' };
		let msg = "<span class='fw-bold'>You used a key on this " + chests[this.value] + " chest and found ";
		game.player.inventory.useKey();
		if (ui.opened[this.value] == false ){
			ui.opened[this.value] = true;
		}
		if (this.value == 'gold'){			
			let minLoot = 10;
			let loot = randNum(1, steps);
			if (loot < minLoot){
				loot = minLoot;
			}
			ui.delta('gold', loot);
			game.player.inventory.gold += loot;
			msg += loot  + " gold!";
		} else if (this.value == 'portal'){
			ui.delta('portal', 1);
			game.player.inventory.potions.portal++;
			msg += " a portal potion!";
		}
		ui.addToLogs(msg + "</span>");
		this.value = 'open';			

	}
}