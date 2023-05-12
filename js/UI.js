class UI{	
	
	animatingInterval = setInterval(this.animating, 50);
	animationHappening = false;
	dStep = 0;
	dungeonBG = '#4A4B4D';
	logs = [];	
	menuHidden = true;
	opposites = { dungeon: 'store', store: 'dungeon' };
	outsideBG = '#9b9fa6';
	positions = game.config.positions.slice();
	potionsHidden = true;
	pulledAt = null;
	storeRevealed = false;
	winDisplayedAt = null;
	window = 'dungeon';
	wins = null;
	winPointer = null;	
	constructor(){
		this.printReels(true);
		$(".window").addClass('d-none');
		$("#" + this.window).removeClass('d-none');
	}
	refresh(){
		if (game.config.gold > 0 && !this.storeRevealed){
			this.storeRevealed = true;
			$("#menu").removeClass('d-none');
		}
		let icons = ['health', 'armor', 'gold', 'weapon', 'cure', 'heal', 'portal', 'repair'];
		for (let i in game.config.auto){
			$("#auto-" + i).prop('checked', game.config.auto[i]);
		}
		
		if ($("#armorSection").hasClass('d-none') && game.config.armor > 0){
			$("#armorSection").removeClass('d-none');
		}
		for (let icon of icons){
			let modifier = '-outside';
			if (game.config.crawling){
				modifier = '';
			}
			$("#" + icon + "Icon").attr('src', 'img/icon-' + icon + modifier + ".png" );
		}
		if (!this.potionsHidden){
			$("#potions").removeClass('d-none');
		}
		$(".menu").addClass('d-none');
		if (!game.config.crawling && !game.config.pulling && ui.pulledAt == null){			
			$("#menu-" + this.opposites[this.window]).removeClass('d-none');
		}
		let fills = ['armor', 'credits', 'gold', 'health', 'lastDive', 'lines', 'maxArmor', 'maxHealth', 'maxLines', 'steps', 'weapon'];
		for (let fill of fills){			
			$("#" + fill).html(game.config[fill]);
		}
		for (let i in game.config.potions){
			let potion = game.config.potions[i];			
			$("#" + i).html(potion);
			$("#drink-" + i).prop('disabled', !(potion > 0 &&  game.config.crawling));
			if (potion == 'portal' && game.config.mob != null){
				$("#drink-portal").prop('disabled', true);
			}
		}
		$("#crawl-button").removeClass('btn-success');
		$("#crawl-button").removeClass('btn-danger');
		$("#crawl-button").removeClass('btn-warning');
		$("body").css('background-color', this.dungeonBG);
		$("body").css('color', 'white');
		$(".menu").css('color', 'white');

		$(".dungeon").removeClass('d-none');
		if (!game.config.crawling){
			$(".dungeon").addClass('d-none');
			$("body").css('background-color', this.outsideBG);
			$("body").css('color', 'black');
			$(".menu").css('color', 'black');
			$("#crawl-button").html('enter');
			$("#crawl-button").addClass('btn-success');			
		} else if (game.config.crawling && game.config.forward){
			$("#crawl-button").html('exit');
			$("#crawl-button").addClass('btn-danger');
		} else if (game.config.crawling && !game.config.forward){
			$("#crawl-button").html('exiting');
			$("#crawl-button").addClass('btn-warning');
		
		}
		$(".pull").prop('disabled', false);
		if (game.config.gold < 1 || this.wins != null || game.config.pulling){
			$(".pull").prop('disabled', true);
		}
		this.refreshFighting();
		this.printLog();
		let width = (game.config.health / game.config.maxHealth * 100) + "%"
		$("#healthBar").css('width', width);
	}

	animating(){
		if (this.winDisplayedAt != null && Date.now() - this.winDisplayedAt < game.config.timeToDisplayWin){
			return;

		} else if (this.winDisplayedAt != null && Date.now() - this.winDisplayedAt > game.config.timeToDisplayWin){
			this.winDisplayedAt = null;
		}
		if (ui.pulledAt != null && Date.now() - ui.pulledAt < game.config.timeToRoll){
			ui.roll();
		} else if (ui.pulledAt != null && Date.now() - ui.pulledAt >= game.config.timeToRoll){
			ui.pulledAt = null;
			ui.refresh();
			ui.printReels(true);
		} else if (ui.wins != null){
			ui.animatingWins();
			return;
		}
	
		ui.animationHappening = false;
	}

	animatingWins(){
		//console.log('animatingWins');
		this.winDisplayedAt = Date.now();
		this.animationHappening = true;
		let win = game.config.wins[this.wins[this.winPointer]];
		$(".reel").removeClass('win');
		for (let reelID in win){
			let positions = game.fetchPositions(reelID, true);
			$("#reel-" + reelID + "-" + win[reelID]).addClass('win');
			$("#reel-" + reelID + "-" + win[reelID]).html("<img src='img/reel-" + game.config.reels[reelID][positions[win[reelID]]] + "-win.png'>")
		}
		this.winPointer++;
		if (this.winPointer > this.wins.length - 1 || this.winPointer > game.config.lines - 1){
			this.winPointer = null;
			this.wins = null;
			$("#pull").prop('disabled', false);
		}
	}

	animateWins(wins){
		if(wins.length < 1){
			return;
		}
		$("#pull").prop('disabled', true);
		this.wins = wins;
		this.winPointer = 0;
	}

	exit(){
		$("#game-box").attr('src', 'img/d-close.png');
	}

	

	formatID(id){
		return Number(id) + 1;
	}

	mobDies(name){
		$("#game-box").attr('src', 'img/d-' + name + "-dead.png" )
	}

	mobHits(name){
		$("#game-box").attr('src', 'img/d-' + name + "-hitMe.png" )
	}

	mobSpawns(){
		$("#game-box").attr('src', 'img/d-rat.png');
	}

	playerHits(name){
		$("#game-box").attr('src', 'img/d-' + name + "-hitThem.png" )
	}

	printLog(){
		let txt = '';
		for (let i in this.logs){
			let log = this.logs[i];
			txt += log;
		}
		$("#log").html(txt);
	}

	printReel(reelID, real){		
		let positions = game.fetchPositions(reelID, real);

		return "<div id='reel-" + reelID + "-prev' class='reel'>" 
			+ "<img src='img/reel-"
			+ game.config.reels[reelID][positions.prev] 
			+ ".png'></div><div  id='reel-" + reelID + "-pos' class='reel'>" 
			+ "<img src='img/reel-"
			+ game.config.reels[reelID][positions.pos] 
			+ ".png'></div><div id='reel-" + reelID + "-next' class='reel'>" 
			+ "<img src='img/reel-"
			+ game.config.reels[reelID][positions.next] 
			+ ".png'></div>"
	}

	printReels(real){

		for (let i in game.config.reels){

			let txt = this.printReel(i, real);
			$("#reel-" + i).html(txt);
		} 
	}



	refreshFighting(){
		let caption = ' no one';
		if (game.config.mob != null){
			let mob = game.config.mob;
			let width = (mob.health / mob.max * 100).toFixed(0) + "%";			
			let bar = "<div class='progress'><div id='healthBar' " 
				+ "class='progress-bar bg-danger' role='progressbar' "
				+ "style='width: " + width + "'></div></div>";
			caption = "<div> lvl " + mob.level + " " + mob.name + " a: " 
				+ mob.attack + " hp: "+ mob.health + "/" + mob.max
				+ "</div><div>" + bar + "</div>";
		}
		$("#fighting").html(caption);
	}

	roll(){
		for (let reelID in game.config.reels){
			this.positions[reelID]++;
			if (this.positions[reelID] >= game.config.reelSymbols.length - 1){
				this.positions[reelID] = 0;
			}			
		}
		
		this.printReels(false);
	}

	status(msg, type){
		let txtClass = ' player ';
		if (type != undefined){
			txtClass = " " + type + " ";
		}
		this.logs.unshift("<div class='" + txtClass + "'>" + msg + "</div>");		
	}

	step(){
		$("#game-box").attr('src', 'img/d-' + this.dStep + '.png');

		if (game.config.forward){
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
