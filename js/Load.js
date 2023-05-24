class Load {
    static go(){
        //console.log(typeof localStorage.getItem('saveKey'), localStorage.getItem('saveKey'));
        if (localStorage.getItem('saveKey') == 'null' || localStorage.getItem('saveKey') == null){
            return false;
        }
        let saveObj = JSON.parse(atob(localStorage.getItem('saveKey')));

        Load.loading('game', saveObj.game, []);
        Load.loading('ui', saveObj.ui, []);
        game.savedAt = Date.now();
        return true;
    }

    static loading(start, saveState, tree){
        //console.log(" ")

        //console.log(saveState);
        let baseRoot = window[start];
        //console.log('loading: ', saveState, tree, start, baseRoot);
        for (let each of tree){
            //console.log(each);
            baseRoot = baseRoot[each]
        }

        //console.log(baseRoot);
        for (let key of Object.keys(saveState)){
            
            if (baseRoot[key] != null && typeof baseRoot[key] == 'object'){
                tree.push(key);
                this.loading(start, saveState[key], tree);
                tree.pop();
                continue;
            }
            
            if (baseRoot[key] != null && baseRoot[key] == undefined){
                
                //console.log('');
                //console.log('populating:' + key);
                //console.log('-', saveState, tree);
                //console.log('--', key, baseRoot[key], saveState[key] );
                //console.log(typeof baseRoot);
                //console.log(baseRoot);
                //console.log(baseRoot[key]);
                //console.log(saveState);
                
                //console.log('populating: ', baseRoot, key, baseRoot[key] );    
                //console.log(saveState, saveState[key]);
            }
            
            
            if (baseRoot[key] != saveState[key]){                
                baseRoot[key] = saveState[key];                

            }
            
        }
    }
}