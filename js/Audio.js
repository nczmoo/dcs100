class Sound {
    multi = {
        'player-hit': 4,
        'player-miss': 8, 
        'rat-hit': 3,
        'rat_king-hit': 3,
        'snake-hit': 3,
        'snake_queen-hit': 3,
        'spider-hit': 3,
    }
    mp3Root = 'mp3/';
    var audio = new Audio('audio_file.mp3');
    audio.play();
    play(eventName){
        if (Object.keys(this.multi)){
            this.playMulti(eventName);
            return;
        }
        let audio = new Audio(this.mp3Root + eventName + ".png");
        audio.play();
    }

    playMulti(eventName){
        let max = this.multi[eventName];
        let rand = randNum(0, max);
        let audio = new Audio(this.mp3Root + eventName + "-" + rand + ".png");
        audio.play();
    }

}