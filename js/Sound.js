class Sound {
    multi = {
        'player-hit': 4,
        'player-miss': 8, 
        'rat-hit': 2,
        'rat_king-hit': 2,
        'slot-fail': 2,
        'snake-hit': 2,
        'snake_queen-hit': 2,
        'spider-hit': 2,
        step: 8,
    }
    mp3Root = 'mp3/';

    play(eventName){
        if (!game.config.sound){
            return;
        }
        if (Object.keys(this.multi).includes(eventName)){
            this.playMulti(eventName);
            return;
        }
        let filename = this.mp3Root + eventName + ".mp3";
        console.log(filename);
        let audio = new Audio(filename);
        audio.volume = game.config.soundVolume;
        audio.play();
    }

    playMulti(eventName){
        let max = this.multi[eventName];
        let rand = randNum(0, max);
        let filename = this.mp3Root + eventName + "-" + rand + ".mp3";
        console.log(filename)
        let audio = new Audio(filename);
        audio.volume = game.config.soundVolume;
        audio.play();
    }

}