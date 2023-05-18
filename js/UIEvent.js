class UIEvent {
	dStep = 0;

    chestFound(){
		$("#game-box").attr('src', 'img/d-chest-' + game.dungeon.chest.value + ".png" )
	}

	die(){
		ui.animation.dead.dying = true;
	}

    exit(){
		$("#game-box").attr('src', 'img/d-close.png');
	}

    mobDies(name){
		$("#game-box").attr('src', 'img/d-' + name + "-dead.png" )
		$("#fighting").html(' no one');
	}

	mobHits(name){
		$("#game-box").attr('src', 'img/d-' + name + "-hitMe.png" )
		//this is more distracting than engaging
		//this.playerHitAt = 1;
		//$("body").css('background-color', ui.uirefresh.playerHitBG);
		
	}

	mobSpawns(name){
		$("#game-box").attr('src', 'img/d-' + name + '.png');
		let mob = game.mob.entity;
		let width = (mob.health / mob.max * 100).toFixed(0) + "%";			
		let bar = "<div id='mobHealthProgress' class='progress'><div id='mobHealthBar' " 
				+ "class='progress-bar bg-danger' role='progressbar' "
				+ "style='width: " + width + "'></div></div>";		
		$("#fighting").html("<div>" + mob.name + " a: " 
		+ mob.attack + " hp: <span id='mobHealth'>"+ mob.health + "</span>/" + mob.max
		+ "</div><div>" + bar + "</div>");
	}

	playerHits(name){
		$("#game-box").attr('src', 'img/d-' + name + "-hitThem.png" )
		let mob = game.mob.entity;

		let width = (mob.health / mob.max * 100).toFixed(0) + "%";			
		$("#mobHealth").html(mob.health);
		$("#mobHealthBar").css('width', width);
		ui.animation.hit('mobHealthProgress');
	}

	step(){
		$("#game-box").attr('src', 'img/d-' + this.dStep + '.png');
		if (game.dungeon.forward){
			this.dStep++;
			
		} else {
			this.dStep --;
		}
		if (this.dStep > 5){
			this.dStep = 0;
		}
		if (this.dStep < 0){
			this.dStep = 5;
		}
	}
}