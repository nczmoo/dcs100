class UIRefreshFill {
    go(){

        $("#invested").html("(" + game.slots.invested + " spent)");
        $("#gold").html(game.player.inventory.gold);
		$("#key").html(game.player.inventory.keys);
        let fills = ['armor', 'health',  'maxArmor', 'maxHealth', 'weapon'];
		for (let fill of fills){			
			$("#" + fill).html(game.player.stats[fill]);
		}
		fills = ['lastDive', 'steps'];
		for (let fill of fills){			
			$("#" + fill).html(game.dungeon[fill]);
		}
		fills = ['value','max'];
		for (let fill of fills){			
			$("#lines-" + fill).html(game.slots.lines[fill]);
		}
        if (game.player.inventory.keys > 0 && game.dungeon.steps > 0 && game.dungeon.crawling){
			$("#nextChestAt").html("(" + ((game.dungeon.steps - game.dungeon.chest.last) / (game.dungeon.chest.foundAt - game.dungeon.chest.last) * 100).toFixed(1) + "%)");
		}
    }
}