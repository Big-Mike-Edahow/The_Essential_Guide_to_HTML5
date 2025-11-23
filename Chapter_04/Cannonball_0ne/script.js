// script.js

// Get the HTML Canvas element, and it's 2d Context;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Variable declarations.
let timerID
let horizontalVel;
let verticalVel1;
let verticalVel2;
let gravity = 2;
let iBallX = 20;
let iBallY = 300;

let everything = [];

// Object constructors
function Ball(sX, sY, radius, styleString) {
    this.sX = sX;
    this.sY = sY;
    this.radius = radius;
    this.draw = drawBall;
    this.moveit = moveBall;
    this.fillstyle = styleString;
}

function MyRectangle(sX, sY, sWidth, sHeight, styleString) {
    this.sX = sX;
    this.sY = sY;
    this.sWidth = sWidth;
    this.sHeight = sHeight;
    this.fillstyle = styleString;
    this.draw = drawRects;
    this.moveit = moveRect;
}

// Create instances of the games objects.
let cannonBall = new Ball(iBallX, iBallY, 10, "rgb(250,0,0)");
let target = new MyRectangle(300, 100, 80, 200, "rgb(0,5,90)");
let ground = new MyRectangle(0, 300, 600, 30, "rgb(10,250,0)");
everything.push(target);
everything.push(ground);
everything.push(cannonBall);

// Functions
function drawBall() {
    ctx.fillStyle = this.fillstyle;
    ctx.beginPath();
    //ctx.fillStyle= rgb(0,0,0);
    ctx.arc(this.sX, this.sY, this.radius, 0, Math.PI * 2, true);
    ctx.fill();
}

function moveBall(dX, dY) {
    this.sX += dX;
    this.sY += dY;
}

function fire() {
    cannonBall.sX = iBallX;
    cannonBall.sY = iBallY;
    horizontalVel = Number(document.f.hv.value);
    verticalVel1 = Number(document.f.vv.value);

    drawAll();
    timerID = setInterval(change, 100);
    return false;
}

function drawRects() {
    ctx.fillStyle = this.fillstyle;
    ctx.fillRect(this.sX, this.sY, this.sWidth, this.sHeight);
}

function moveRect(dX, dY) {
    this.sX += dX;
    this.sY += dY;
}

function change() {
    let dX = horizontalVel;
    verticalVel2 = verticalVel1 + gravity;
    let dY = (verticalVel1 + verticalVel2) * .5;
    verticalVel1 = verticalVel2;
    cannonBall.moveit(dX, dY);

    // Check for hitting target
    let bX = cannonBall.sX;
    let bY = cannonBall.sY;
    if ((bX >= target.sX) && (bX <= (target.sX + target.sWidth)) &&
        (bY >= target.sY) && (bY <= (target.sY + target.sHeight))) {
        clearInterval(timerID);
    }
    // Check for getting beyond ground level.
    if (bY >= ground.sY) {
        clearInterval(timerID);
    }
    drawAll();
}

function drawAll() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < everything.length; i++) {
        everything[i].draw();
    }
}

function init() {
    drawAll();
}
