$(document).on('click', '', function(e){

})

$(document).on('mousemove', '', function(e){	
})

$(".slot-buttons:not([disabled])").hover(function(e){	
	if ($("#" + e.target.id).attr('src') == "img/slots-" + e.target.id.split('-')[1] + ".png"){		
		$("#" + e.target.id).attr('src', "img/slots-" + e.target.id.split('-')[1] + "-hover.png");
	}
},  function (e){
	if ($("#" + e.target.id).attr('src') == "img/slots-" + e.target.id.split('-')[1] + "-hover.png"){
		$("#" + e.target.id).attr('src', "img/slots-" + e.target.id.split('-')[1] + ".png");
	}
});

$(".slot-buttons:not([disabled])").click(function(e){	
	$("#" + e.target.id).attr('src', "img/slots-" + e.target.id.split('-')[1] + "-click.png");
	setTimeout(function(){ $("#" + e.target.id).attr('src', "img/slots-" + e.target.id.split('-')[1] + ".png"); }, 250)
});

$("#game-box").hover(function(e){	
	if (!game.dungeon.crawling && $("#game-box").attr('src') == 'img/d-close.png'){
		
		$("#game-box").attr('src', 'img/d-open.png');
	}
},  function (){
	if ($("#game-box").attr('src') == 'img/d-open.png'){
		$("#game-box").attr('src', 'img/d-close.png');
	}
});

$(document).on('click', '#autopull', function(e){	
	game.autopull();
});

$(document).on('click', '.auto', function(e){	
	game.changeAuto(e.target.id.split('-')[1], $("#" + e.target.id).is(':checked'));
});

$(document).on('click', '.crawl', function(e){
	if (ui.dungeonFirst){
		ui.showTutorial('dungeon');
		ui.dungeonFirst = false;
		return;
	}
	game.dungeon.crawl.change();
	ui.refresh();
});

$(document).on('click', '.changeLines', function(e){
	game.slots.lines.change(e.target.id.split('-')[1], Number(e.target.id.split('-')[2]));
});

$(document).on('click', '.menu', function(e){
	ui.window = e.target.id.split('-')[1];
	$(".window").addClass('d-none');
	$(".menu").removeClass('d-none');	
	$("#menu-" + e.target.id.split('-')[1]).addClass('d-none');
	$("#" + e.target.id.split('-')[1]).removeClass('d-none');
	ui.refresh();
})

$(document).on('click', '#menu-dungeon', function(e){

	game.music.play('outside');
});

$(document).on('click', '#menu-store', function(e){
	if (ui.slotsFirst){
		ui.showTutorial('slots');
		ui.slotsFirst = false;
	}
	game.music.play('store');
	ui.print.addToReels();
});

$(document).on('click', '#pull', function(e){
	game.slots.pull();
});

$(document).on('click', '#story', function(e){
	game.story();
});

$(document).on('click', '#tutorial', function(e){
	$("#tutorial").addClass('d-none');
	if (ui.tutorial == 'dungeon'){
		game.dungeon.crawl.change();		
	}

	ui.tutorial = null;
	ui.refresh();
});

$(document).on('click', '#upgrade', function(e){
	game.slots.lines.upgrade();
});

$(document).on('click', '.verb', function(e){
	game[e.target.id]();
})

$(document).on('click', '.verb1', function(e){
	game[e.target.id.split('-')[0]](e.target.id.split('-')[1]);
})

$(document).on('click', 'button', function(e){
	ui.refresh()
})
