$(document).on('click', '', function(e){

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
	if (!game.config.crawling && $("#game-box").attr('src') == 'img/d-close.png'){
		
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
	game.dungeon.changeCrawling();

	ui.refresh();
});

$(document).on('click', '.changeLines', function(e){
	game.slots.changeLines(e.target.id.split('-')[1], Number(e.target.id.split('-')[2]));
});

$(document).on('click', '.menu', function(e){
	ui.window = e.target.id.split('-')[1];
	$(".window").addClass('d-none');
	$(".menu").removeClass('d-none');	
	$("#menu-" + e.target.id.split('-')[1]).addClass('d-none');
	$("#" + e.target.id.split('-')[1]).removeClass('d-none');
	ui.refresh();
})

$(document).on('click', '#pull', function(e){
	game.slots.pull();
});

$(document).on('click', '#upgrade', function(e){
	game.slots.upgrade();
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
