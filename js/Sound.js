class Sound {
    multi = {
        'player-hit': 4,
        'player-miss': 8, 
        'rat-hit': 2,
        'rat_king-hit': 2,
        'slot-fail': 1,
        'snake-hit': 2,
        'snake_queen-hit': 2,
        'spider-hit': 2,
        step: 8,
    }
    silentMobs = ['ghost', 'skeleton', 'orc', 'orc_lord', 'lich', 'demon'];
    mp3Root = 'mp3/';

    play(eventName){
        let parse = eventName.split('-')[0];        
        if (!game.config.sound || this.silentMobs.includes(parse)){
            return;
        }
        if (Object.keys(this.multi).includes(eventName)){
            this.playMulti(eventName);
            return;
        }
        let filename = this.mp3Root + eventName + ".mp3";
        let audio = new Audio(filename);
        audio.volume = game.config.soundVolume;
        audio.play();
    }

    playMulti(eventName){
        let max = this.multi[eventName];
        let rand = randNum(0, max);
        let filename = this.mp3Root + eventName + "-" + rand + ".mp3";
        let audio = new Audio(filename);
        audio.volume = game.config.soundVolume;
        audio.play();
    }

}