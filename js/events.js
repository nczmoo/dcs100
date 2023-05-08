$(document).on('click', '', function(e){

})

$(document).on('click', '#crawl', function(e){
	if (!game.config.crawling){
		game.config.crawling = true;		
		return;
	} 
	
	if (game.config.forward){
		game.config.forward = false;	
		return;
	}
	game.config.forward = true;
});

$(document).on('click', '.menu', function(e){
	ui.window = e.target.id.split('-')[1];
	$(".window").addClass('d-none');
	$("#" + e.target.id.split('-')[1]).removeClass('d-none');
	$(".menu").prop('disabled', false);
	$("#" + e.target.id).prop('disabled', true);
})

$(document).on('click', '.verb', function(e){
	game[e.target.id]();
})

$(document).on('click', '.verb1', function(e){
	game[e.target.id.split('-')[0]](e.target.id.split('-')[1]);
})

$(document).on('click', 'button', function(e){
	ui.refresh()
})
