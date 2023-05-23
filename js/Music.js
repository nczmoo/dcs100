class Music {
    multi = {
        die: 2,
        dungeon: 5,
        outside: 1, 
        store: 2
    }
    mp3Root = 'mp3/music/';
    muted = false;
    songPlaying = null;
    trackStarted = null;
    volume = null;

    constructor(volume){
        
        this.volume = volume;
    }

    onOrOff(){
        this.muted = ! this.muted;   
        if (this.songPlaying != null){
            this.songPlaying.muted = this.muted;
        }
    }

    play(eventName){        
        if (this.trackStarted == eventName){
            return;
        }
        this.trackStarted = eventName;

        if (Object.keys(this.multi).includes(eventName)){
            this.playMulti(eventName);
            return;
        }
        let filename = this.mp3Root + eventName + ".mp3";
        this.playFile(filename);
    }

    playMulti(eventName){
        let max = this.multi[eventName];
        let rand = randNum(0, max);
        let filename = this.mp3Root + eventName + "-" + rand + ".mp3";
        this.playFile(filename);        
    }

    playFile(filename){
        if (this.songPlaying != null){
            this.songPlaying.pause();
        }
        this.songPlaying = new Audio(filename);
        this.songPlaying.volume = this.volume;
        this.songPlaying.muted = this.muted;
        this.songPlaying.loop = true;
        if (filename.split('-')[0].includes('die')){
            this.songPlaying.loop = false;
            setTimeout(function(){
                game.music.play('outside');
            }, 3000)
        }
        this.songPlaying.play();        
    }
}