//import { rejects } from "assert";

var w = 30;
var h = 30;
var side = 10;
var socket = io();
var exanak = "dzmer";

function setup() {
    createCanvas(w * side, h * side);
    background('#acacac');
}



function drawMatrix(arr) {
    
    var p = document.getElementById("Seasons");
    var matrix = arr[0];
    var exanak = arr[1];

    p.innerHTML = exanak;
    for (y in matrix) {
        for (x in matrix[y]) {
            if (matrix[y][x] == 1) {
                if (exanak == "dzmer" || exanak == "ashun") {
                    fill("white");
                }
                else if (exanak == "garun" || exanak == "amar") {
                    fill("green");
                }
            }
            else if (matrix[y][x] == 2) {
                if (exanak == "dzmer" || exanak == "ashun") {
                    fill("yellow");
                }
                else if (exanak == "garun" || exanak == "amar") {
                    fill("brown");
                }
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("orange");
            }
            else if (matrix[y][x] == 5) {
                fill("blue");
            }
            else if (matrix[y][x] == 0) {
                fill('#acacac');
            }
            rect(x*side, y*side, side, side);
        }
        
    }

}
socket.on("matrix", drawMatrix);

var button = document.getElementById('stop');
function handleSubmit(evt){
    socket.emit("stop");
}
button.onclick = handleSubmit;