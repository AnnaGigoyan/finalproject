var livingcreature = require("./livingcreature.js")
module.exports = class Grass extends livingcreature {
    mult(b) {
        this.multiply++;
        Grassesborn++;
        //var newCell = random(this.chooseCell(0));
        var newCellArr = this.chooseCell(0);
        var num = Math.floor(Math.random() * newCellArr.length)
        var newCell = newCellArr[num];


        if (this.multiply >= b && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1]);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
    }
}