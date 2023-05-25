save = new Save();
game = new Game()
ui = new UI()

game.paused = Load.go();
ui.refresh();
const rgb2hex = (rgb) => `${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`


function distance(x1, x2, y1, y2){
	return Math.floor(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));
}

function howMany(arr, element){
	let n = 0;
	for (let i of arr){
		if (element == i){
			n ++;
		}            
	}
	return n;
}

function randNum(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}