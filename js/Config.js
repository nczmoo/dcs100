class Config {
    armor = 0;
    
    maxArmor = 0;
    crawling = false;
    credits = 0;
    forward = true;
    gold = 10;
    goldInRun = 0;
	health = 10;   
    lastDive = 10;
    lines = 1; 
    maxLines = 5;
    maxHealth = 10;
    maxSteps = null;
    mob = null;
    mobs = {
        rat: {attack: 1, health: 2, max: 2, level: 1}
    }
    modifiers = {
        attack: 0,
        health: 0,
        max: 0,        
        level: 0,
    }
    numOfReels = 3;
    numOfSymbolsOnReel = 5;
    potions = {
        heal: 0,
        portal: 0,
    }
    positions = [];
    reelSymbols = ['heal', 'weapon', 'maxArmor', 'maxHealth', 'portal'];
    reels = [];
    spawnRate = 4;
    steps = 0;  
    stepsForward = 0;  
    weapon = 1;
    wins = [
        ['pos',	'pos',	'pos'],
        ['prev',	'pos',	'next'],
        ['next',	'pos',	'prev'],
        ['next',	'pos',	'next'],
        ['prev',	'pos',	'prev']
    ];
    yourTurn = true;

    constructor(){       
        this.resetMaxSteps();
        while (this.reels.length < this.numOfReels){
            this.reels.push(this.reelSymbols);
            this.positions.push(randNum(0, this.reelSymbols.length -1));
        }
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

    getGold(delta){        
        this.gold += delta;
        this.goldInRun += delta;
        this.checkLines();
        if (this.gold > 0 && ui.menuHidden){
            $("#menu").removeClass('d-none');
            ui.menuHidden = false;
        }
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