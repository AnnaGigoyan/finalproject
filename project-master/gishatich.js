var livingcreature = require("./livingcreature.js")
module.exports = class Gishatich extends livingcreature {
    constructor(x, y) {
        super(x, y);
        this.energy = 5;

    }

    getNewDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }

    chooseCell(character) {
        this.getNewDirections();
        return super.chooseCell(character);

    }

    mult(b) {
        var emptyArr = this.chooseCell(0);
        var num = Math.floor(Math.random() * emptyArr.length)
        var empty = emptyArr[num];
        Gishatichborn++; 
        if (empty && this.energy > b) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 3
            var gs = new Gishatich(newX, newY)
            gishatichArr.push(gs)
        }
    }

    move() {
        var emptyArr = this.chooseCell(0);
        var num = Math.floor(Math.random() * emptyArr.length)

        var empty = emptyArr[num];

        this.energy--;
        if (empty) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 3
            matrix[this.y][this.x] = 0

            this.x = newX
            this.y = newY
        }
    }

    eat() {
        var foodArr = this.chooseCell(2);
        var num = Math.floor(Math.random() * foodArr.length)
        var food = foodArr[num];

        if (food) {
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 3
            matrix[this.y][this.x] = 0

            for (var i in xotakerArr) {
                if (xotakerArr[i].x == newX && xotakerArr[i].y == newY) {
                    xotakerArr.splice(i, 1)
                }
            }

            this.x = newX
            this.y = newY
            this.energy += 3
        }
    }

    die(b) {
        if (this.energy <= b) {
            matrix[this.y][this.x] = 0
            for (var i in gishatichArr) {
                if (gishatichArr[i].x == this.x && gishatichArr[i].y == this.y) {
                    gishatichArr.splice(i, 1)
                }
            }
        }
    }
}
