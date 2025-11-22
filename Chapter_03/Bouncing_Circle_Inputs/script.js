// script.js

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let boxX = 0;
let boxY = 0;
let boxWidth = canvas.width;
let boxHeight = canvas.height;
let ballRadius = 10;
let boxBoundX = boxWidth + boxX - ballRadius;
let boxBoundY = boxHeight + boxY - ballRadius;
let inboxBoundX = boxX + ballRadius;
let inboxBoundY = boxY + ballRadius;
let ballX = 50;
let ballY = 60;
let ballVertX = 4;
let ballVertY = 8;

window.addEventListener("load", init);
function init() {
    ctx.lineWidth = ballRadius;
    ctx.fillStyle = "rgb(200,0,50)";
    moveBall();
    setInterval(moveBall, 100);
}

function moveBall() {
    ctx.clearRect(boxX, boxY, boxWidth, boxHeight);
    moveAndCheck();
    ctx.beginPath();

    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);
}

function moveAndCheck() {
    let newBallX = ballX + ballVertX;
    let newBallY = ballY + ballVertY;

    if (newBallX > boxBoundX) {
        ballVertX = -ballVertX;
        newBallX = boxBoundX;
    }
    if (newBallX < inboxBoundX) {
        newBallX = inboxBoundX;
        ballVertX = -ballVertX;
    }
    if (newBallY > boxBoundY) {
        newBallY = boxBoundY;
        ballVertY = -ballVertY;
    }
    if (newBallY < inboxBoundY) {
        newBallY = inboxBoundY;
        ballVertY = -ballVertY;
    }
    ballX = newBallX;
    ballY = newBallY;
}

function change() {
    // Convert input form strings to numbers.
    ballVertX = Number(document.f.hv.value);
    ballVertY = Number(document.f.vv.value);
    return false;
}
