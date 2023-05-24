class UIRefreshImages {
    go(){
        if (!game.music.muted && $("#musicConfig").attr('src', 'img/music-off.png')){
			$("#musicConfig").attr('src', 'img/music-on.png');
		} else if (game.music.muted && $("#musicConfig").attr('src', 'img/music-on.png')){
			$("#musicConfig").attr('src', 'img/music-off.png');
		}

		if (game.config.sound && $("#soundConfig").attr('src', 'img/sound-off.png')){
			$("#soundConfig").attr('src', 'img/sound-on.png');
		} else if (!game.config.sound && $("#soundConfig").attr('src', 'img/sound-on.png')){
			$("#soundConfig").attr('src', 'img/sound-off.png');
		}
        let icons = ['health', 'armor', 'gold', 'weapon', 'cure', 'heal', 'portal', 'repair', 'key'];
		for (let icon of icons){
			let modifier = '-outside';
			if (game.dungeon.crawling){
				modifier = '';
			} else if (ui.window == 'store'){
				modifier = '-store';
			}
			$("#" + icon + "Icon").attr('src', 'img/icon-' + icon + modifier + ".png" );
		}	
    }
}