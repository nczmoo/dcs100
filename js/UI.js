class UI{		
	animation = new UIAnimation();
	animatingInterval = setInterval(this.animation.loop.go, 50);
	event = new UIEvent();
	exiting = 0;	
	monsters = [];
	opened = {
		gold: false,
		portal: false,
	}
	popping = [];
	playerHitAt = null;
	print = new UIPrint();
	pulledAt = null;
	uirefresh = new UIRefresh();
	window = 'dungeon';
	wins = null;

	constructor(){
		$(".window").addClass('d-none');
		$("#" + this.window).removeClass('d-none');	
	}

	addToLogs(msg, type){
		let txtClass = ' player ';
		if (type != undefined){
			txtClass = " " + type + " ";
		}
		this.print.logs.unshift("<div class='" + txtClass + "'>" + msg + "</div>");		
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
		this.print.reelsArr.push(name);		
	}

	addToStoreLog(msg){
		this.print.reelCaptions += msg.replace('-store', '-slot');
		this.print.storeLogs.push('<div>' + msg + "</div>");
	}

	clearUIBeforeCrawl(){
		$("#death").html('');
		$("#monsters").html('');
		this.monsters = [];
	}
	
	delta(id, n){
		this.print.deltasArr[id] += n;		
	}

	formatID(id){
		return Number(id) + 1;
	}

	formatName(name){
		return name.split('-').join(' ');
	}

	pop(id){
		this.popping.push(id);		
	}

	popFromPopping(){
		for (let id of this.popping){
			$("#" + id + "Section").addClass('fw-bold');
			setTimeout(function(){ $("#" + id + "Section").removeClass('fw-bold');}, 1000);
		}
	}

	refresh(){
		this.uirefresh.go();
	}

	
}
