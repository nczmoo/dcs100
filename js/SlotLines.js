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

        if (this.value > this.gold){
            this.value = this.gold;
        }
    }

    upgrade(){
		if (game.player.inventory.gold < this.max * 10){
			return;
		}
		game.slots.reels.add();
		game.sound.play('slot-upgrade');
		game.player.inventory.gold -= this.max * 10;
		$(".changeLines-" + this.max).removeClass('d-none');
		this.max *= 10;
		if ($("#invested").hasClass('d-none')){
			$("#invested").removeClass('d-none')
		}
		$("#upgrade").attr('src', 'img/slots-upgrade-' + (this.max * 10) + ".png")
		if (this.max >= 1000){
			$("#upgrade").addClass('d-none');
		}
		ui.refresh();
	}
}