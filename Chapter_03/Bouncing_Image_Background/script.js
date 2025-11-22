// script.js

// Get the HTML Canvas element and it's 2d Context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Variable declarations
let ballRadius = 10;
let boxX = 0;
let boxY = 0;
let boxWidth = 400;
let boxHeight = 300;
let boxBoundX = boxWidth;
let boxBoundY = boxHeight;
let inboxBoundX = boxX + ballRadius;
let inboxBoundY = boxY + ballRadius;

let ballX = 50;
let ballY = 60;
let ballVelX = 4;
let ballVelY = 8;

let stoppedX = ballVelX;
let stoppedY = ballVelY;

let grad;
let color;
let timerId;

let ball = new Image();
let background = new Image();

function init() {
    background.src = "./images/reunion.jpg";
    ball.src = "./images/candy.png";
    ctx.fillStyle = grad;
    ctx.lineWidth = ballRadius;
    moveBall();
    timerId = setInterval(moveBall, 100);
}

function change() {
    // Convert the text values from the HTML form to numbers.
    ballVelX = Number(document.f.hv.value);
    ballVelY = Number(document.f.vv.value);
    stoppedX = ballVelX;
    stoppedY = ballVelY;
    return false;
}

function stop() {
    clearInterval(timerId);
    stoppedX = ballVelX;
    stoppedY = ballVelY;
    // Display the scene.
    moveBall();
    return false;
}

function resume() {
    clearInterval(timerId);

    ballVelX = stoppedX;
    ballVelY = stoppedY;
    moveBall();
    timerId = setInterval(moveBall, 100);
    return false;
}

function moveBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    moveAndCheck();
    ctx.drawImage(background, 0, 0, 4000, 3000, 0, 0, 400, 300);

    ctx.drawImage(ball, 0, 0, 388, 435, ballX - ballRadius, ballY - ballRadius, 388 / 10, 435 / 10);
    ctx.strokeRect(0, 0, 400, 300);

}

function moveAndCheck() {
    let newBallX = ballX + ballVelX;
    let newBallY = ballY + ballVelY;

    if (newBallX > boxBoundX
    ) {
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
