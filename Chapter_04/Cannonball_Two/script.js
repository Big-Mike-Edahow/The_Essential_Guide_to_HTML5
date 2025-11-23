// script.js

// Get the HTML Canvas element and it's 2d Context.
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Variable declarations
let timerID;
let outOfCannon;
let horizontalVel;
let verticalVel1;
let verticalVel2;
let gravity = 2;
let cannonX = 10;
let cannonY = 280;
let cannonLength = 200;
let cannonHeight = 20;
let ballRadius = 10;
let targetX = 500;
let targetY = 50;
let targetW = 85;
let targetH = 280;
let hTargetX = 450;
let hTargetY = 220;
let hTargetW = 355;
let hTargetH = 96;

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
    this.moveit = moveBall;
}
function Picture(sX, sY, sWidth, sHeight, imageFile) {
    let imageA = new Image();
    imageA.src = imageFile;
    this.sX = sX;
    this.sY = sY;
    this.image = imageA;
    this.sWidth = sWidth;
    this.sHeight = sHeight;
    this.draw = drawAnImage;
    this.moveit = moveBall;
}

// Instances of game objects
let cannonBall = new Ball(cannonX + cannonLength, cannonY + cannonHeight * .5, ballRadius, "rgb(250,0,0)");
let ballIndex = everything.length;
everything.push([cannonBall, false]);

let target = new Picture(targetX, targetY, targetW, targetH, "./images/hill.jpg");
let hTarget = new Picture(hTargetX, hTargetY, hTargetW, hTargetH, "./images/plateau.jpg");
let targetIndex = everything.length;
everything.push([target, false]);

let ground = new MyRectangle(0, 300, 600, 30, "rgb(10,250,0)");
everything.push([ground, false]);

let cannon = new MyRectangle(cannonX, cannonY, cannonLength, cannonHeight, "rgb(40,40,0)");
let cannonIndex = everything.length;  //save to use later
everything.push([cannon, true, 0, cannonX, cannonY + cannonHeight * .5]);  // will set rotation later

// Functions
function drawAnImage() {
    ctx.drawImage(this.image, this.sX, this.sY, this.sWidth, this.sHeight);
}

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

function drawRects() {
    ctx.fillStyle = this.fillstyle;
    ctx.fillRect(this.sX, this.sY, this.sWidth, this.sHeight);
}

function fire() {
    let angle = Number(document.f.ang.value);
    let outOfCannon = Number(document.f.vo.value);
    let angleRadians = angle * Math.PI / 180;
    horizontalVel = outOfCannon * Math.cos(angleRadians);
    verticalVel1 = - outOfCannon * Math.sin(angleRadians);
    everything[cannonIndex][2] = - angleRadians;
    cannonBall.sX = cannonX + cannonLength * Math.cos(angleRadians);
    cannonBall.sY = cannonY + cannonHeight * .5 - cannonLength * Math.sin(angleRadians);
    drawAll();
    timerID = setInterval(change, 100);
    return false;
}

function change() {
    let dX = horizontalVel;
    verticalVel2 = verticalVel1 + gravity;
    let dY = (verticalVel1 + verticalVel2) * .5;
    verticalVel1 = verticalVel2;
    cannonBall.moveit(dX, dY);

    // Check for hitting target.
    let bX = cannonBall.sX;
    let bY = cannonBall.sY;
    if ((bX >= target.sX) && (bX <= (target.sX + target.sWidth)) &&
        (bY >= target.sY) && (bY <= (target.sY + target.sHeight))) {
        clearInterval(timerID);
        // Temove target and insert htarget.
        everything.splice(targetIndex, 1, [hTarget, false]);
        everything.splice(ballIndex, 1);
        drawAll();
    }
    //check for getting beyond ground level
    if (bY >= ground.sY) {
        clearInterval(timerID);
    }
    drawAll();
}

function drawAll() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < everything.length; i++) {
        var ob = everything[i];
        if (ob[1]) {  //need to translate and rotate
            ctx.save();
            ctx.translate(ob[3], ob[4]);
            ctx.rotate(ob[2]);
            ctx.translate(-ob[3], -ob[4]);
            ob[0].draw();
            ctx.restore();
        }
        else {
            ob[0].draw();
        }
    }
}

function init(){
  drawAll();  
} 
