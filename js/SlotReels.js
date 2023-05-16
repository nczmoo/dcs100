
    generate(){
        this.values = [];
        this.positions = [];
        while (this.values.length < this.numOfReels){
            this.values.push(this.fetchRandReel());
            this.positions.push(randNum(0, this.length -1));
        }
    }
}