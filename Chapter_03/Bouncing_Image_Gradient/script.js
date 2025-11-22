// script.js

// Get the HTML Canvas element, and it's 2d Context.
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Variable declarations
let ballRadius = 10;
let boxX = 20;
let boxY = 30;
let boxWidth = 350;
let boxHeight = 250;
let boxBoundX = boxHeight + boxY - ballRadius;
let boxBoundY = boxHeight+boxY-ballRadius;
let inboxBoundX = boxX + ballRadius;
let inboxBoundY = boxY + ballRadius;
let ballX = 50;
let ballY = 60;

let ballVelX = 4;
let ballVelY = 8;

let grad;
let color;

const hue = [
    [255, 0, 0],
    [255, 255, 0],
    [0, 255, 0],
    [0, 255, 255],
    [0, 0, 255],
    [255, 0, 255]
];

let image = new Image();
image.src = "./pearl.jpg";

function init() {
    grad = ctx.createLinearGradient(boxX, boxY, boxX + boxWidth, boxY + boxHeight);
    for (let h = 0; h < hue.length; h++) {
        color = 'rgb(' + hue[h][0] + ',' + hue[h][1] + ',' + hue[h][2] + ')';
        grad.addColorStop(h * 1 / hue.length, color);
    }
    ctx.fillStyle = grad;
    ctx.lineWidth = ballRadius;
    moveBall();
    setInterval(moveBall, 100);
}

function change() {
    // Convert the text values from the HTML form to numbers.
    ballVelX = Number(document.f.hv.value);
    ballVelY = Number(document.f.vv.value);
    return false;
}

function moveBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    moveAndCheck();
    ctx.drawImage(image, ballX - ballRadius, ballY - ballRadius, 2 * ballRadius, 2 * ballRadius);
    ctx.fillRect(boxX, boxY, ballRadius, boxHeight);
    ctx.fillRect(boxX + boxWidth - ballRadius, boxY, ballRadius, boxHeight);
    ctx.fillRect(boxX, boxY, boxWidth, ballRadius);
    ctx.fillRect(boxX, boxY + boxHeight - ballRadius, boxWidth, ballRadius);

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
        newballY = inboxBoundY;
        ballVelY = -ballVelY;
    }
    ballX = newBallX;
    ballY = newBallY;
}
