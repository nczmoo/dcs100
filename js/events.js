$(document).on('click', '', function(e){

})


$("#game-box").hover(function(){	
	if (!game.config.crawling && $("#game-box").attr('src') == 'img/d-close.png'){
		
		$("#game-box").attr('src', 'img/d-open.png');
	}
},  function (){
	if ($("#game-box").attr('src') == 'img/d-open.png'){
		$("#game-box").attr('src', 'img/d-close.png');
	}
});

$(document).on('click', '.auto', function(e){	
	game.changeAuto(e.target.id.split('-')[1], $("#" + e.target.id).is(':checked'));
});

$(document).on('click', '.crawl', function(e){
	game.dungeon.changeCrawling();
	
	ui.refresh();
});

$(document).on('click', '.lines', function(e){
	game.slots.changeLines(e.target.id.split('-')[1]);
});

$(document).on('click', '.menu', function(e){
	ui.window = e.target.id.split('-')[1];
	$(".window").addClass('d-none');
	$("#" + e.target.id.split('-')[1]).removeClass('d-none');
	$(".menu").prop('disabled', false);
	$("#" + e.target.id).prop('disabled', true);
})

$(document).on('click', '#pull', function(e){
	game.slots.pull();
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
