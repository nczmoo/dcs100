class Config {
    armor = 0;
    auto = {
        heal: true,
        repair: true,
    };
    chanceToPoison = 100;    
    crawling = false;
    credits = 0;
    dungeon = [];
    forward = true;
    gold = 0;
    goldInRun = 0;
	health = 10;   
    lastDive = 10;
    lines = 1; 
    maxArmor = 0;
    maxLines = 10;
    maxHealth = 10;
    maxSteps = null;
    mob = null;
    mobs = {
        rat: {attack: 1, health: 2, max: 2, level: 1, steps: 0, },
        rat_king: {attack: 10, health: 40, max: 40, level: 1, steps: 200},
        snake: {attack: 5, health: 10, max: 10, level: 1, steps: 50},

    }
    modifiers = {
        attack: 0,
        health: 0,
        max: 0,        
        level: 0,
    }
    numOfReels = 3;
    numOfSymbolsOnReel = 5;
    poisonCounter = 0;
    potionList = ['heal', 'portal', 'repair'];
    potions = {};
    positions = [];
    pulling = false;
    reelSymbols = ['weapon', 'maxArmor', 'maxHealth-1', 'heal'];
    addToReels = {
        'repair': 50,
        'maxHealth-2': 100,
        'maxHealth-3': 150,

    }
    reels = [];
    spawnRate = 4;
    steps = 0;  
    stepsForward = 0;  
    timeToRoll = 1000;
    timeToDisplayWin = 1000;
    weapon = 1; //1
    wins = [
        ['pos',	'pos',	'pos'],
        ['prev', 'pos',	'next'],
        ['next', 'pos',	'prev'],
        ['next', 'pos',	'next'],
        ['prev', 'pos',	'prev'],
        ['prev', 'prev', 'prev'],
        ['next', 'next', 'next'],
        ['pos', 'prev' , 'pos'],
        ['pos', 'next' , 'pos'],
    ];
    yourTurn = true;

    constructor(){       
        for (let name of this.potionList){
            this.potions[name] = 0;
        }
        this.resetMaxSteps();        
        this.generateReels();
    }

    checkLines(){
        if (this.lines < 1){
            this.lines = 1;
        }
        if (this.lines < 2){
            return;
        }
        if (this.lines > this.maxLines){
            this.lines = this.maxLines;
        }

        if (this.lines > this.gold){
            this.lines = this.gold;
        }
    }

    fetchRandReel(){
        let reel = [];
        while (reel.length < this.reelSymbols.length){
            let rand = this.reelSymbols[randNum(0, this.reelSymbols.length - 1)];
            if (this.howMany(reel, rand) < this.howMany(this.reelSymbols, rand)){
                reel.push(rand)
            }
        }        
        return reel;
    }
    generateReels(){
        this.reels = [];
        this.positions = [];
        while (this.reels.length < this.numOfReels){
            this.reels.push(this.fetchRandReel());
            this.positions.push(randNum(0, this.reelSymbols.length -1));
        }
    }

    /*
    generateReel(){
        let reel = [];                
        while (reel.length < this.numOfSymbolsOnReel){
            let rand = this.reelSymbols[randNum(0, this.reelSymbols.length - 1)];            
            if (reel.length == 0 || reel[reel.length - 1] != rand){                
                reel.push(rand);
            }
        }        
        return reel;
    }
    */

    getGold(delta){        
        this.gold += delta;
        this.goldInRun += delta;
        this.checkLines();
        if (this.gold > 0 && ui.menuHidden){
            $("#menu").removeClass('d-none');
            ui.menuHidden = false;
        }
    }

    howMany(arr, element){
        let n = 0;
        for (let i of arr){
            if (element == i){
                n ++;
            }            
        }
        return n;
    }

    resetArmor(){
        this.armor = this.maxArmor;
    }

    resetGold(){
        this.gold = 0;
        this.checkLines();
    }

    resetHealth(){
        this.health = this.maxHealth;
    }

    resetMaxSteps(){
        this.maxSteps = randNum(this.spawnRate, this.spawnRate * 2); 
    }
}