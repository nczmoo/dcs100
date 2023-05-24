class UIRefreshDisplay {
    opposites = { dungeon: 'store', store: 'dungeon' };
	//storeRevealed = false;

    go (){
    	if (game.player.inventory.gold > 0 && ui.menuHidden){
            $("#menu").removeClass('d-none'); 
            ui.menuHidden = false;
        }
        $("#nextChestAt").addClass('d-none');		
		if (game.player.inventory.keys > 0){
			$("#nextChestAt").removeClass('d-none');
		}
        $("#monsters").addClass('d-none');
		$(".autoSettings").addClass('d-none');
		if (!game.dungeon.crawling){
			$("#monsters").removeClass('d-none');
			$(".autoSettings").removeClass('d-none');
		}
        $("#stepCaption").removeClass('d-none');
		if (!game.dungeon.forward){
			$("#stepCaption").addClass('d-none');
		}
		//console.log(this.storeRevealed);
		if (game.player.inventory.gold > 0 && $("#menu").hasClass('d-none')){
			//this.storeRevealed = true;
			$("#menu").removeClass('d-none');
		}
        if ($("#maxArmorSection").hasClass('d-none') && game.player.stats.maxArmor > 0){
			$("#maxArmorSection").removeClass('d-none');
		}
        $(".menu").addClass('d-none');
		//console.log(game.dungeon.crawling, this.opposites[ui.window])	

		if (!game.dungeon.crawling ){		
			$("#menu-" + this.opposites[ui.window]).removeClass('d-none');
		}
		for (let opening in ui.opened){
			if (ui.opened[opening] && $("#" + opening + "Chest").hasClass('d-none')){
				$("#" + opening + "Chest").removeClass('d-none')
			}
		}

		if (game.player.inventory.keys > 0 && $("#keySection").hasClass('d-none')){
			$("#keySection").removeClass('d-none')
		}

		console.log(game.slots.pulling);
		
		if (game.slots.pulling){
		
			$("#menu-dungeon").addClass('d-none');
		}

    }
}