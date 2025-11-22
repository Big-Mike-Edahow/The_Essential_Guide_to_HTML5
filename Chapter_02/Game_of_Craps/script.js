// script.js

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let diceX = 50;
let diceY = 50;
let diceWidth = 100;
let diceHeight = 100;
let dotRadius = 6;
let dX;
let dY;
let firstTurn = true;
let point;

const throwBtn = document.getElementById("throw-button");
throwBtn.addEventListener("click", throwDice);

function throwDice() {
    let sum;
    let choice = (Math.floor(Math.random() * 6)) + 1;
    sum = choice;
    dX = diceX;
    dY = diceY;
    drawFace(choice);
    dX = diceX + 150;
    choice = (Math.floor(Math.random() * 6)) + 1;
    sum += choice;
    drawFace(choice);
    if (firstTurn) {
        switch (sum) {
            case 7:
            case 11:
                document.f.outcome.value = "You win!";
                break;
            case 2:
            case 3:
            case 12:
                document.f.outcome.value = "You lose!";
                break;
            default:
                point = sum;
                document.f.pv.value = point;
                firstTurn = false;
                document.f.stage.value = "Need follow-up throw.";
                document.f.outcome.value = "   ";
        }
    }
    else {
        switch (sum) {
            case point:
                document.f.outcome.value = "You win!";
                document.f.stage.value = "Back to first throw.";
                document.f.pv.value = " ";
                firstTurn = true;
                break;
            case 7:
                document.f.outcome.value = "You lose!";
                document.f.stage.value = "Back to first throw.";
                document.f.pv.value = " ";
                firstTurn = true;
        }
    }
}

function drawFace(n) {
    let dotX;
    let dotY;

    ctx.lineWidth = 5;
    ctx.clearRect(dX, dY, diceWidth, diceHeight);
    ctx.strokeRect(dX, dY, diceWidth, diceHeight)
    ctx.fillStyle = "#009966";

    switch (n) {
        case 1:
            draw1();
            break;
        case 2:
            draw2();
            break;
        case 3:
            draw2();
            draw1();
            break;
        case 4:
            draw4();
            break;
        case 5:
            draw4();
            draw1();
            break;
        case 6:
            draw4();
            draw2Middle();
            break;

    }
}

function draw1() {
    let dotX;
    let dotY;

    ctx.beginPath();
    dotX = dX + .5 * diceWidth;
    dotY = dY + .5 * diceHeight;
    ctx.arc(dotX, dotY, dotRadius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

function draw2() {
    let dotX;
    let dotY;

    ctx.beginPath();
    dotX = dX + 3 * dotRadius;
    dotY = dY + 3 * dotRadius;
    ctx.arc(dotX, dotY, dotRadius, 0, Math.PI * 2, true);
    dotX = dX + diceWidth - 3 * dotRadius;
    dotY = dY + diceHeight - 3 * dotRadius;
    ctx.arc(dotX, dotY, dotRadius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

function draw4() {
    let dotX;
    let dotY;

    ctx.beginPath();
    dotX = dX + 3 * dotRadius;
    dotY = dY + 3 * dotRadius;
    ctx.arc(dotX, dotY, dotRadius, 0, Math.PI * 2, true);
    dotX = dX + diceWidth - 3 * dotRadius;
    dotY = dY + diceHeight - 3 * dotRadius;

    ctx.arc(dotX, dotY, dotRadius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();

    dotX = dX + 3 * dotRadius;
    dotY = dY + diceHeight - 3 * dotRadius;  //no change

    ctx.arc(dotX, dotY, dotRadius, 0, Math.PI * 2, true);
    dotX = dX + diceWidth - 3 * dotRadius;
    dotY = dY + 3 * dotRadius;
    ctx.arc(dotX, dotY, dotRadius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

function draw2Middle() {
    let dotX;
    let dotY;

    ctx.beginPath();
    dotX = dX + 3 * dotRadius;
    dotY = dY + .5 * diceHeight;
    ctx.arc(dotX, dotY, dotRadius, 0, Math.PI * 2, true);
    dotX = dX + diceWidth - 3 * dotRadius;
    dotY = dY + .5 * diceHeight; //no change
    ctx.arc(dotX, dotY, dotRadius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}
