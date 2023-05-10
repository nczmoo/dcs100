class UI{
	logs = [];
	dStep = 0;
	animatingInterval = setInterval(this.animating, 1000);
	potionsHidden = true;
	menuHidden = true;
	window = 'dungeon';
	wins = null;
	winPointer = null;	
	constructor(){
		this.printReels();
		$(".window").addClass('d-none');
		$("#" + this.window).removeClass('d-none');
	}
	refresh(){

		if (!this.potionsHidden){
			$("#potions").removeClass('d-none');
		}
		$(".menu").prop('disabled', true);
		if (!game.config.crawling){
			$(".menu").prop('disabled', false);
			$("#menu-" + this.window).prop('disabled', true);
		}
		let fills = ['armor', 'credits', 'gold', 'health', 'lastDive', 'lines', 'maxArmor', 'maxHealth', 'steps', 'weapon'];
		for (let fill of fills){			
			$("#" + fill).html(game.config[fill]);
		}
		for (let i in game.config.potions){
			let potion = game.config.potions[i];			
			$("#" + i).html(potion);
			$("#drink-" + i).prop('disabled', potion < 1);		
		}
		$("#crawl-button").removeClass('btn-success');
		$("#crawl-button").removeClass('btn-danger');
		$("#crawl-button").removeClass('btn-warning');
		if (!game.config.crawling){
			$("#crawl-button").html('enter');
			$("#crawl-button").addClass('btn-success');			
		} else if (game.config.crawling && game.config.forward){
			$("#crawl-button").html('exit');
			$("#crawl-button").addClass('btn-danger');
		} else if (game.config.crawling && !game.config.forward){
			$("#crawl-button").html('exiting');
			$("#crawl-button").addClass('btn-warning');
			

		}
		$("#pull").prop('disabled', false);
		if (game.config.gold < 1 || this.wins != null){
			$("#pull").prop('disabled', true);
		}
		this.refreshFighting();
		this.printLog();
		let width = (game.config.health / game.config.maxHealth * 100) + "%"
		$("#healthBar").css('width', width);

	}

	animating(){
		if (ui.wins != null){
			ui.animatingWins();
		}
	}

	animatingWins(){

		let win = game.config.wins[this.wins[this.winPointer]];
		$(".reel").removeClass('win');
		for (let reelID in win){
			let positions = game.fetchPositions(reelID);
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

	printReel(reelID){		
		let positions = game.fetchPositions(reelID);
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

	printReels(){
		
		for (let i in game.config.reels){

			let txt = this.printReel(i);
			$("#reel-" + i).html(txt);
		} 
	}

	printStore(){
		this.printReel();
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
