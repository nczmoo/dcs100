class SlotLines {
    value = 1; 
	max = 1;
    change(delta, n){
		if ((delta == 'more' && (game.player.inventory.gold == 0 
			|| this.value == game.player.inventory.gold 
			|| this.value >= this.max)) 
			|| (delta == 'less' && this.value == 1)){
			return;
		}
		game.sound.play('slot-line-change-' + delta);
		if (delta == 'more'){
			this.value += n;
			if (this.value > this.max){
				this.value = this.max;				
			}			
			if (this.value > game.player.inventory.gold){
				this.value = game.player.inventory.gold;
			}
			ui.refresh();
			return;
		}
		this.value -= n;
		if (this.value < 1){
			this.value = 1;
		}
		ui.refresh();
	}

	check(){
        if (this.value < 1){
            this.value = 1;
        }
        if (this.value < 2){
            return;
        }
        if (this.value > this.max){
            this.value = this.max;
        }

        if (this.value > game.player.inventory.gold){
            this.value = game.player.inventory.gold;
        }
    }

    upgrade(){
		if (game.player.inventory.gold < this.max * 10){
			return;
		}
		game.slots.reels.add();
		game.sound.play('slot-upgrade');
		game.player.inventory.gold -= this.max * 10;
		this.max *= 10;
		ui.refresh();
	}
}