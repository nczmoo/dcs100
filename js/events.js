$(document).on('click', '', function(e){

})

$(".slot-buttons:not([disabled])").click(function(e){	
	$("#" + e.target.id).attr('src', "img/slots-" + e.target.id.split('-')[1] + "-click.png");
	setTimeout(function(){ $("#" + e.target.id).attr('src', "img/slots-" + e.target.id.split('-')[1] + ".png"); }, 250)
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
