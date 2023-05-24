class Save {

    static go(){
        let saveObj = {};
        saveObj.game = game;
        saveObj.ui = ui;
        localStorage.setItem('saveKey', btoa(JSON.stringify(saveObj)))
        game.savedAt = Date.now();
        
    }
}