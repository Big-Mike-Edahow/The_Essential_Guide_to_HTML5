// script.js

// Get the HTML Canvas element and it's 2d context.
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Draw text with various fonts.
ctx.font = "15px Lucida Handwriting";
ctx.fillText("This is Lucida Handwriting.", 10, 20);

ctx.font = "italic 30px HarlemNights";
ctx.fillText("Italic Harlem Nights.", 40, 80);

ctx.font = "bold 40px HarlemNights"
ctx.fillText("Bold Harlem Nights.", 100, 200);

ctx.font = "30px Accent";
ctx.fillText("Accent.", 200, 300); 
