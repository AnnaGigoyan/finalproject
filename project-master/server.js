grassArr = [];
xotakerArr = [];
gishatichArr = [];
axvesArr = [];
kerpar2Arr = [];
weather = ["dzmer", "garun", "amar", "ashun"]
exanak = "dzmer";


var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});

server.listen(3000);
var fs = require("fs");

/*io.on("connection", function (socket) {

});*/

Grassesborn = 0;
Grasseaterborn = 0;
Gishatichborn = 0;

var Grass = require("./grass.js");
var Xotaker = require("./xotaker.js");
var Gishatich = require("./gishatich.js");
var Axves = require("./axves.js");
var Kerpar2 = require("./kerpar2.js");

var w = 30;
var h = 30;
function getMatrix(w, h) {
    var matrix = [];
    for (var y = 0; y < h; y++) {
        matrix[y] = [];
        for (var x = 0; x < w; x++) {
            var r = Math.floor(Math.random() * 100);
            if (r < 20) r = 0;
            else if (r < 65) r = 1;
            else if (r < 90) r = 2;
            else if (r < 100) r = 3;
            matrix[y][x] = r;
        }
    }
    return matrix;
}



matrix = getMatrix(w, h);
for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] == 1) {
            var gr = new Grass(x, y)
            grassArr.push(gr)
        }
        else if (matrix[y][x] == 2) {
            var xt = new Xotaker(x, y)
            xotakerArr.push(xt)
        }
        else if (matrix[y][x] == 3) {
            var gs = new Gishatich(x, y)
            gishatichArr.push(gs)

        }
        else if (matrix[y][x] == 4) {
            var av = new Axves(x, y)
            axvesArr.push(av)
        }
        else if (matrix[y][x] == 5) {
            var kr = new Kerpar2(x, y)
            kerpar2Arr.push(kr)
        }
    }
}


time = 0
function drawServerayin() {
    time++
    if (time % 40 < 10) {
        exanak = weather[1];
    }
    else if (time % 40 < 20) {
        exanak = weather[2];
    }
    else if (time % 40 < 30) {
        exanak = weather[3];
    }
    else if (time % 40 < 40) {
        exanak = weather[0];
    }
    for (var i in grassArr) {
        if (exanak == "garun" || exanak == "amar") {
            grassArr[i].mult(8);
        }
        else if (exanak == "ashun" || exanak == "dzmer") {
            grassArr[i].mult(9);
        }
    }

    for (var i in xotakerArr) {

        xotakerArr[i].eat()
        xotakerArr[i].move()
        if (exanak == "garun" || exanak == "amar") {
            xotakerArr[i].mult(10);
            xotakerArr[i].die(5);
        }
        else if (exanak == "ashun" || exanak == "dzmer") {
            xotakerArr[i].mult(12);
            xotakerArr[i].die(6);
        }


    }
    for (var i in gishatichArr) {
        gishatichArr[i].eat()
        gishatichArr[i].move()
        if (exanak == "garun" || exanak == "amar") {
            gishatichArr[i].mult(16);
            
            gishatichArr[i].die(0);
        }
        else if (exanak == "ashun" || exanak == "dzmer") {
            gishatichArr[i].mult(14);
            gishatichArr[i].die(2)
        }

    }
    for (var i in axvesArr) {
        axvesArr[i].eat()
        axvesArr[i].eat2()
        if (exanak == "garun" || exanak == "amar") {
            axvesArr[i].mult(10);
            axvesArr[i].die(0);
        }
        else if (exanak == "ashun" || exanak == "dzmer") {
            axvesArr[i].mult(12);
            axvesArr[i].die(3)
        }
        axvesArr[i].move()

    }
    for (var i in kerpar2Arr) {
        kerpar2Arr[i].eat()
        kerpar2Arr[i].eat2()
        if (exanak == "garun" || exanak == "amar") {
            kerpar2Arr[i].mult(9);
            kerpar2Arr[i].die(0);
        }
        else if (exanak == "ashun" || exanak == "dzmer") {
            kerpar2Arr[i].mult(12);
            kerpar2Arr[i].die(3)
        }
        kerpar2Arr[i].move()

    }
    io.sockets.emit("matrix", [matrix,exanak]);
}

var a = setInterval(drawServerayin, 1000);

var statistics = { "a": [] };


setInterval(function () {
    statistics.a.push({
        "Grassesborn": Grassesborn,
        "Grasseaterborn": Grasseaterborn,
        "Gishatichborn": Gishatichborn,
    })

    fs.writeFile("statistics.json", JSON.stringify(statistics), function (err) {
        if (err) throw err;
    })
}, 13000);
 

io.on("connection",function (socket){
    
    socket.on("stop",function (){
        clearInterval(a);  
    });
});




