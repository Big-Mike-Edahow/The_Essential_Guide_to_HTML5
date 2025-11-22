// script.js

// Get the HTML Canvas element, and it's 2d context.
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

// Variable declarations.
let ballRadius = 10;
let boxX = 20;
let boxY = 30;
let boxWidth = 350;
let boxHeight = 250;
let boxBoundX = boxWidth + boxX - ballRadius;
let boxBoundY = boxHeight + boxY - ballRadius;
let inboxBoundX = boxX + ballRadius;
let inboxBoundY = boxY + ballRadius;
let ballX = 50;
let ballY = 60;
let ballVelX = 4;
let ballVelY = 8;

window.addEventListener('load', function() {
  init();
});
function init() {
    ctx.lineWidth = ballRadius;
    moveBall();
    setInterval(moveBall, 100);
}

function moveBall() {
    ctx.clearRect(boxX, boxY, boxWidth, boxHeight);
    moveAndCheck();
    ctx.beginPath();
    ctx.fillStyle = "rgb(200,0,50)";
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);
}

function moveAndCheck() {
    let newBallX = ballX + ballVelX;
    let newBallY = ballY + ballVelY;

    if (newBallX > boxBoundX) {
        ballVelX = -ballVelX;
        newBallX = boxBoundX;
    }
    if (newBallX < inboxBoundX) {
        newBallX = inboxBoundX;
        ballVelX = -ballVelX;
    }
    if (newBallY > boxBoundY) {
        newBallY = boxBoundY;
        ballVelY = -ballVelY;
    }
    if (newBallY < inboxBoundY) {
        newBallY = inboxBoundY;
        ballVelY = -ballVelY;
    }
    ballX = newBallX;
    ballY = newBallY;
}

function change() {
    ballVelX = Number(document.f.hv.value);
    ballVelY = Number(document.f.vv.value);
    
    return false;
}
