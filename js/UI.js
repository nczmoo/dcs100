class UI{		
	animation = new UIAnimation();
	animatingInterval = setInterval(this.animation.loop, 50);
	comingBack = false;
	deltaIntervals = {};
	deltas = {};
	dying = false;
	exiting = 0;	
	logs = [];	
	monsters = [];
	opened = {
		gold: false,
		portal: false,
	}
	popping = [];
	
	playerHitAt = null;
	pulledAt = null;
	reelCaptions = '';
	reels = [];
	storeLogs = [];
	uirefresh = new UIRefresh();
	window = 'dungeon';
	wins = null;
	constructor(){
		this.deltas.gold = 0;
		this.deltas.health = 0;
		this.deltas.armor = 0;
		this.deltas.weapon = 0;
		for (let potion of game.player.potionList){
			this.deltas[potion] = 0;
		}
		this.printReels(true);
		$(".window").addClass('d-none');
		$("#" + this.window).removeClass('d-none');
	}
	
	addToMonsters(name){
		this.monsters.push(name);
		let txt = "You'll encounter more ";
		for (let i in this.monsters){
			let name = this.monsters[i];
			txt += name + 's';
			if (i == this.monsters.length - 1){
				continue;
			} else if ( i == this.monsters.length - 2 && this.monsters.length > 1){
				txt += " and ";
				continue;
			}
			txt += ", ";
		}
		txt += " in the future.";
		$("#monsters").html(txt);
	}

	addToReels(name){
		this.reels.push(name);
		
		
	}

	chestFound(){
		$("#game-box").attr('src', 'img/d-chest-' + game.dungeon.chest + ".png" )
	}

	clearUIBeforeCrawl(){
		$("#death").html('');
		$("#monsters").html('');
		this.monsters = [];
	}
	

	delta(id, n){
		this.deltas[id] += n;		
	}
	
	die(){
		this.dying = true;
	}

	exit(){
		$("#game-box").attr('src', 'img/d-close.png');
	}

	formatID(id){
		return Number(id) + 1;
	}

	hit(id){
		$("#" + id).css('animation-name', 'shake');
		$("#" + id).css('animation-duration', '.5s');
		setTimeout(function(){
			$("#" + id).css('animation-name', '');
			$("#" + id).css('animation-duration', '');
		}, 1000);
	}

	isDead(){
		let bodyBG = $("body").css('background-color')
		let intBG = parseInt(rgb2hex(bodyBG), 16);
		let delta = 1118481;
		let changed = intBG - delta;
		let hexBG = (changed).toString(16)
		if (changed < 200000){
			hexBG = '000000';
			this.dying = false;
			this.comingBack = true;
		}
		$("body").css('background-color', '#' + hexBG);
		

	}

	isComingBack(){
		let bodyBG = $("body").css('background-color')
		let intBG = parseInt(rgb2hex(bodyBG), 16);
		let delta = 1118481;
		let changed = intBG + delta;
		let hexBG = (changed).toString(16)
		if (changed > 10198950){
			hexBG = this.uirefresh.outsideBG;
			this.comingBack = false;
			this.refresh();
		}
		$("body").css('background-color', '#' + hexBG);
		
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
		ui.hit('mobHealthProgress');
	}

	pop(id){
		this.popping.push(id);		
	}

	popFromPopping(){
		for (let id of this.popping){
			//$("#" + id + "Section").addClass('fw-bold');
			//setTimeout(function(){ $("#" + id + "Section").removeClass('fw-bold');}, 1000);
		}
	}

	printAddToReels(){
		let txt = "You have some new stuff added to your reels: "
		for (let i in this.reels){
			let name = this.reels[i];
			txt += "<span class='fw-bold'>" + game.slots.reels.captions[name] + "</span>"
			+ " <img src='img/reel-" + name + ".png' height='24' width='24'>";

			if (i == this.reels.length - 1){
				continue;
			} else if ( i == this.reels.length - 2 && this.reels.length > 1){
				txt += " and ";
				continue;
			}
			txt += ", ";
		}		
		
		$("#reelsCaption").html(txt);
		this.reels = [];
	}

	printDeltas(){
		for (let id in this.deltas){
			let n = this.deltas[id];
			if (n == 0){
				continue;
			}
			let txt = '(';
		
			if (n == 0){
				return;
			}

			if (n < 0){
				txt += "<span class='deltaMin fs-5 fw-bold'>" + n + "</span>";
			} else if (n > 0){
				txt += "<span class='deltaPlus fs-5'>+" + n + "</span>";
			}
			txt += ")";
			$("#" + id + "Delta").html(txt);
			this.deltas[id] = 0;
			this.deltaIntervals[id] = setTimeout(function(){ $("#" + id + "Delta").html(''); }, 1000);
		}
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
		let positions = game.slots.reels.fetchPositions(reelID, real);
		let straightClass = '', straightFile = '';
		if (real){
			straightClass = 'straight';
			straightFile = '-straight';
		}
		/* keep this for debugging
		console.log(reelID, positions, game.slots.reels.values, game.slots.reels.fetch(reelID, positions.prev), 
			game.slots.reels.fetch(reelID, positions.pos), 
			game.slots.reels.fetch(reelID, positions.next))
			*/
		return "<div id='reel-" + reelID + "-prev' class='reel'>" 
			+ "<img src='img/reel-"
			+ game.slots.reels.fetch(reelID, positions.prev)
			+ ".png'></div><div  id='reel-" + reelID + "-pos' class='reel " + straightClass + "'>" 
			+ "<img src='img/reel-"
			+ game.slots.reels.fetch(reelID, positions.pos)
			+ straightFile +  ".png'></div><div id='reel-" + reelID + "-next' class='reel'>" 
			+ "<img src='img/reel-"
			+ game.slots.reels.fetch(reelID, positions.next)
			+ ".png'></div>"
	}

	printReels(real){
		for (let reelID = 0; reelID < game.slots.reels.numOfReels; reelID++){
			let txt = this.printReel(reelID, real);
			$("#reel-" + reelID).html(txt);
		} 
	}

	printStoreLog(){
		let txt = '';
		for (let i = this.storeLogs.length - 1; i >= 0; i --){
			let log = this.storeLogs[i];
			txt += log;
		}
		$("#storeLog").html(txt);
		$("#reelsCaption").html(this.reelCaptions);
		this.reelCaptions = '';
	}
	

	refresh(){
		this.uirefresh.go();
	}

	status(msg, type){
		let txtClass = ' player ';
		if (type != undefined){
			txtClass = " " + type + " ";
		}
		this.logs.unshift("<div class='" + txtClass + "'>" + msg + "</div>");		
	}




}
