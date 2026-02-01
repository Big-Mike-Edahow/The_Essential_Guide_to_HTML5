// script.js

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let cwidth = 900;
let cheight = 350;
let everything = [];
let curwall;
let wallwidth = 5;
let wallstyle = "rgb(22, 37, 174)";
let walls = [];
let inmotion = false;
let unit = 10;

document.addEventListener('DOMContentLoaded', init);
function init() {
    window.addEventListener('keydown', getkeyAndMove, false);
    drawall();
}

function Token(sx, sy, rad, stylestring, n) {
    this.sx = sx;
    this.sy = sy;
    this.rad = rad;
    this.draw = drawtoken;
    this.n = n;
    this.angle = (2 * Math.PI) / n  //parens may not be needed.
    this.moveit = movetoken;
    this.fillstyle = stylestring;
}

function drawtoken() {
    ctx.fillStyle = this.fillstyle;
    ctx.beginPath();
    let i;
    let rad = this.rad;
    ctx.beginPath();
    ctx.moveTo(this.sx + rad * Math.cos(-.5 * this.angle), this.sy + rad * Math.sin(-.5 * this.angle));
    for (i = 1; i < this.n; i++) {
        ctx.lineTo(this.sx + rad * Math.cos((i - .5) * this.angle), this.sy + rad * Math.sin((i - .5) * this.angle));
    }
    ctx.fill();
}

function movetoken(dx, dy) {
    this.sx += dx;
    this.sy += dy;
    let i;
    let wall;
    for (i = 0; i < walls.length; i++) {
        wall = walls[i];
        if (intersect(wall.sx, wall.sy, wall.fx, wall.fy, this.sx, this.sy, this.rad)) {
            this.sx -= dx;
            this.sy -= dy;
            break;
        }
    }
}

function Wall(sx, sy, fx, fy, width, stylestring) {
    this.sx = sx;
    this.sy = sy;
    this.fx = fx;
    this.fy = fy;
    this.width = width;
    this.draw = drawAline;
    this.strokestyle = stylestring;
}

function drawAline() {
    ctx.lineWidth = this.width;
    ctx.strokeStyle = this.strokestyle;
    ctx.beginPath();
    ctx.moveTo(this.sx, this.sy);
    ctx.lineTo(this.fx, this.fy);
    ctx.stroke();
}

let mypent = new Token(100, 100, 20, "rgb(8, 250, 0)", 5);
everything.push(mypent);

function drawall() {
    ctx.clearRect(0, 0, cwidth, cheight);
    let i;
    for (i = 0; i < everything.length; i++) {
        everything[i].draw();
    }
}

function getkeyAndMove(event) {
    let keyCode;
    if (event == null) {
        keyCode = window.event.keyCode;
        window.event.preventDefault();
    }
    else {
        keyCode = event.keyCode;
        event.preventDefault();
    }
    switch (keyCode) {
        case 37:  // Left arrow.
            mypent.moveit(-unit, 0);
            break;
        case 38:  // Up arrow.
            mypent.moveit(0, -unit);
            break;
        case 39: // Right arrow.
            mypent.moveit(unit, 0);
            break;
        case 40:  // Down arrow.
            mypent.moveit(0, unit);
            break;
        default:
            window.removeEventListener('keydown', getkeyAndMove, false);
    }
    drawall();
}
function intersect(sx, sy, fx, fy, cx, cy, rad) {
    let dx;
    let dy;
    let t;
    let rt;
    /* Parameterizing the line segment, with t going from 0.0 to 1.0,
       and then writing the distance squared from each point to cx,cy to
       determine the minimum by taking the derivative and solving for t,
       where derivative is zero. */
    dx = fx - sx;
    dy = fy - sy;
    t = 0.0 - ((sx - cx) * dx + (sy - cy) * dy) / ((dx * dx) + (dy * dy));
    if (t < 0.0) {

        t = 0.0;
    }
    else if (t > 1.0) {

        t = 1.0;
    }

    // Check if distance at this t is less than radius, actually compare squares.

    dx = (sx + t * (fx - sx)) - cx;
    dy = (sy + t * (fy - sy)) - cy;
    rt = (dx * dx) + (dy * dy);
    if (rt < (rad * rad)) {
        return true;
    }
    else {
        return false;
    }
}

function getwalls() {
    let swalls;
    let sw;
    let i;
    let sx;
    let sy;
    let fx;
    let fy;
    let curwall;
    let lsname;
    for (i = 0; i < document.gf.level.length; i++) {
        if (document.gf.level[i].checked) {
            lsname = document.gf.level[i].value + "maze";
            break;
        }
    }
    // alert("local storage name: "+lsname);
    swalls = localStorage.getItem(lsname);
    if (swalls != null) {
        wallstgs = swalls.split(";");
        walls = [];  // Removes walls from walls array.
        everything = [];
        everything.push(mypent);
        for (i = 0; i < wallstgs.length; i++) {
            sw = wallstgs[i].split("+");

            sx = Number(sw[0]);
            sy = Number(sw[1]);
            fx = Number(sw[2]);
            fy = Number(sw[3]);
            curwall = new Wall(sx, sy, fx, fy, wallwidth, wallstyle);
            walls.push(curwall);
            everything.push(curwall);
        }
        drawall();
    }
    else {
        alert("No data retrieved.");
    }
    window.addEventListener('keydown', getkeyAndMove, false);
    return false;
}
