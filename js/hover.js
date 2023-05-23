$(".slot-buttons:not([disabled])").hover(function(e){	
	if ($("#" + e.target.id).attr('src') == "img/slots-" + e.target.id.split('-')[1] + ".png"){		
		$("#" + e.target.id).attr('src', "img/slots-" + e.target.id.split('-')[1] + "-hover.png");
	}
},  function (e){
	if ($("#" + e.target.id).attr('src') == "img/slots-" + e.target.id.split('-')[1] + "-hover.png"){
		$("#" + e.target.id).attr('src', "img/slots-" + e.target.id.split('-')[1] + ".png");
	}
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
