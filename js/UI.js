class UI{		
	animation = new UIAnimation();
	animatingInterval = setInterval(this.animation.loop, 50);
	deltaIntervals = {};
	deltas = {};
	logs = [];	
	monsters = [];
	popping = [];
	pulledAt = null;
	reels = [];
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
		let fills = ['armor', 'credits', 'gold', 'health', 'lastDive', 'lines', 'maxArmor', 'maxHealth', 'steps', 'weapon'];
		for (let fill of fills){			
			$("#" + fill).html(game.config[fill]);
		}
		for (let i in game.config.potions){
			let potion = game.config.potions[i];			
			$("#" + i).html(potion);
			$("#drink-" + i).prop('disabled', potion < 1);		
		}
		$("#crawl").removeClass('btn-success');
		$("#crawl").removeClass('btn-danger');
		$("#crawl").removeClass('btn-warning');
		if (!game.config.crawling){
			$("#crawl").html('enter');
			$("#crawl").addClass('btn-success');			
		} else if (game.config.crawling && game.config.forward){
			$("#crawl").html('exit');
			$("#crawl").addClass('btn-danger');
		} else if (game.config.crawling && !game.config.forward){
			$("#crawl").html('exiting');
			$("#crawl").addClass('btn-warning');
			
		}
		//txt += ".";
		$("#reelsCaption").html(txt);
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

	mobSpawns(name){
		$("#game-box").attr('src', 'img/d-' + name + '.png');
	}

	playerHits(name){
		$("#game-box").attr('src', 'img/d-' + name + "-hitThem.png" )
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
