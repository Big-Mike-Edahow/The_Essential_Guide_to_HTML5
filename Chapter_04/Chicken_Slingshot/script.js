// script.js

// Get the HTML Canvas Element and it's 2d Context.
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set the canvas width and height according to the window size.
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 70;

// Variable declarations.
let tid;
let startrockx = 100;
let startrocky = 240;
let ballx = startrockx;
let bally = startrocky;
let ballrad = 10;
let ballradsq = ballrad * ballrad;
let inmotion = false;
let horvelocity;
let verticalvel1;
let verticalvel2;
let gravity = 2;

let everything = [];

// Create instances of the images.
var chicken = new Image();
chicken.src = "./images/chicken.jpg";
var feathers = new Image();
feathers.src = "./images/feathers.gif";

// Event listeners and their associated functions.
canvas.addEventListener('mousedown', findball, false);
function findball(ev) {
    var mx;
    var my;
    if (ev.layerX || ev.layerX == 0) { // Firefox, Chrome

        mx = ev.layerX;
        my = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) { // Opera,

        mx = ev.offsetX;
        my = ev.offsetY;
    }

    if (distsq(mx, my, cball.sx, cball.sy) < ballradsq) {
        inmotion = true;
        drawall();
    }
}

canvas.addEventListener('mousemove', moveit, false);
function moveit(ev) {
    let mx;
    let my;
    if (inmotion) {

        if (ev.layerX || ev.layerX == 0) { // Firefox
            mx = ev.layerX;
            my = ev.layerY;
        } else if (ev.offsetX || ev.offsetX == 0) { // Opera
            mx = ev.offsetX;
            my = ev.offsetY;
        }

        cball.sx = mx;
        cball.sy = my;
        mysling.bx = mx;
        mysling.by = my;
        drawall();
    }
}

canvas.addEventListener('mouseup', finish, false);
function finish(ev) {
    // At mouse up, if ball and mysling have been dragged,
    // set up for ball to travel in ballistic arc.
    if (inmotion) {
        inmotion = false;
        // Initial velocity increases with length, make it the square for convenience.
        let outofcannon = distsq(mysling.bx, mysling.by, mysling.s1x, mysling.s1y) / 700;
        // Use angle based on line interval bx,by to s1x,s1y, the upper arm of sling.
        let angleradians = -Math.atan2(mysling.s1y - mysling.by, mysling.s1x - mysling.bx);
        horvelocity = outofcannon * Math.cos(angleradians);
        verticalvel1 = - outofcannon * Math.sin(angleradians);
        drawall();
        tid = setInterval(change, 100);
    }
}

window.addEventListener("resize", resizeCanvas);
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

const reloadButton = document.getElementById("reload-button");
reloadButton.addEventListener("click", function () {
    // Reload the page when the button is clicked.
    window.location.reload();
});

// Object constructors.
function Sling(bx, by, s1x, s1y, s2x, s2y, s3x, s3y, stylestring) {
    this.bx = bx;
    this.by = by;
    this.s1x = s1x;
    this.s1y = s1y;
    this.s2x = s2x;
    this.s2y = s2y;
    this.s3x = s3x;
    this.s3y = s3y;
    this.strokeStyle = stylestring;
    this.draw = drawsling;
    this.moveit = movesling;
}

function Ball(sx, sy, rad, stylestring) {
    this.sx = sx;
    this.sy = sy;
    this.rad = rad;
    this.draw = drawball;
    this.moveit = moveball;
    this.fillstyle = stylestring;
}

function Myrectangle(sx, sy, swidth, sheight, stylestring) {
    this.sx = sx;
    this.sy = sy;
    this.swidth = swidth;
    this.sheight = sheight;
    this.fillstyle = stylestring;
    this.draw = drawrects;
    this.moveit = moverect;
}

// Instances of the game objects.
let mysling = new Sling(startrockx, startrocky, startrockx + 80, startrocky - 10, startrockx + 80, startrocky + 10, startrockx + 70, startrocky + 180, "rgb(120,20,10)");
let cball = new Ball(startrockx, startrocky, ballrad, "rgb(250,0,0)");
let target = new Picture(700, 220, 209, 179, chicken);
let ground = new Myrectangle(0, 400, canvas.width, 70, "rgb(10,250,0)");

everything.push(mysling);
everything.push(cball);
everything.push(target);
everything.push(ground);

// Functions.
function drawsling() {
    ctx.strokeStyle = this.strokeStyle;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(this.bx, this.by);
    ctx.lineTo(this.s1x, this.s1y);
    ctx.moveTo(this.bx, this.by);
    ctx.lineTo(this.s2x, this.s2y);
    ctx.moveTo(this.s1x, this.s1y);
    ctx.lineTo(this.s2x, this.s2y);
    ctx.lineTo(this.s3x, this.s3y);
    ctx.stroke();
}

function movesling(dx, dy) {
    this.bx += dx;
    this.by += dy;
    this.s1x += dx;
    this.s1y += dy;
    this.s2x += dx;
    this.s2y += dy;
    this.s3x += dx;
    this.s3y += dy;
}

function drawball() {
    ctx.fillStyle = this.fillstyle;
    ctx.beginPath();
    //ctx.fillStyle= rgb(0,0,0);
    ctx.arc(this.sx, this.sy, this.rad, 0, Math.PI * 2, true);
    ctx.fill();
}

function moveball(dx, dy) {
    this.sx += dx;
    this.sy += dy;
}

function drawrects() {
    ctx.fillStyle = this.fillstyle;
    ctx.fillRect(this.sx, this.sy, this.swidth, this.sheight);
}

function moverect(dx, dy) {
    this.sx += dx;
    this.sy += dy;
}

function Picture(sx, sy, swidth, sheight, imga) {
    this.sx = sx;
    this.sy = sy;
    this.img = imga;
    this.swidth = swidth;
    this.sheight = sheight;
    this.draw = drawAnImage;
}

function drawAnImage() {
    ctx.drawImage(this.img, this.sx, this.sy, this.swidth, this.sheight);

}

// Use square of distance to lesson computation,
function distsq(x1, y1, x2, y2) {
    return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
}

function drawall() {
    // drawall() erases the whole canvas and then draws everything in everything array.
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < everything.length; i++) {
        everything[i].draw();
    }
}

function change() {
    // Creates the motion of the ball from the slingshot to either the target or the ground.
    let dx = horvelocity;
    verticalvel2 = verticalvel1 + gravity;
    let dy = (verticalvel1 + verticalvel2) * .5;
    verticalvel1 = verticalvel2;
    cball.moveit(dx, dy);

    // Check for hitting target.
    let bx = cball.sx;
    let by = cball.sy;

    // Check for inside of target.
    // Adjust boundaries by 40 to make the hit area smaller.
    if ((bx >= target.sx + 40) && (bx <= (target.sx + target.swidth - 40)) &&
        (by >= target.sy + 40) && (by <= (target.sy + target.sheight - 40))) {
        // Change image to the feathers image.
        target.img = feathers;
    }

    // Check for getting beyond ground level.
    if (by >= ground.sy) {
        clearInterval(tid);
    }
    drawall();
}

// Called onload.
function init() {
    // Initial drawing 
    drawall();
}
