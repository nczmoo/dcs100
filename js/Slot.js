class Slots {
    addToSlots(){
		if (this.config.steps < this.config.lastDive ){
			return;
		}
		for (let name in this.config.addToReels){
			let stepReq = this.config.addToReels[name];
			if (this.config.steps >= stepReq && !this.config.reelSymbols.includes(name)){
				this.config.reelSymbols.push(name);
				this.config.generateReels();
			}
		}
	}
}