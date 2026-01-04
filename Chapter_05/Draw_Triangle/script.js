// script.js

// Get the HTML Canvas element and it's 2d context.
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Variable Declarations
let radius = 50;
let centerX = 160;
let centerY = 120;
let n = 3;
let angle = (2 * Math.PI) / n;

ctx.fillStyle = "rgb(255,0,0)";
ctx.beginPath();
ctx.moveTo(centerX + radius * Math.cos(-.5 * angle), centerY + radius * Math.sin(-.5 * angle));

for (let i = 1; i < n; i++) {
    ctx.lineTo(centerX + radius * Math.cos((i - .5) * angle), centerY + radius * Math.sin((i - .5) * angle));
}

ctx.closePath();
ctx.fill();
