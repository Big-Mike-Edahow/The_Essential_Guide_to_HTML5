// script.js

// Get the HTML Canvas element, and it's 2d context.
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Variable declarations.
canvas.width = 930;
canvas.height = 380;

let firstpick = true;
let firstcard;
let secondcard;
let backcolor = "rgb(128,0,128)";
let frontbgcolor = "rgb(251,215,73)";
let polycolor = "rgb(254,11,0)";
let tablecolor = "rgb(255,255,255)";
let cardrad = 30;
let deck = [];
let firstsx = 30;
let firstsy = 50;
let margin = 30;
let cardwidth = 4 * cardrad;
let cardheight = 4 * cardrad;
let tid;
let matched;
let starttime;

/* Deck holds info on the cards: the location and dimensions and identifying info
   identifying (matching) info in this case is the number of sides for the poly. */

function Card(sx, sy, swidth, sheight, info) {
    this.sx = sx;
    this.sy = sy;
    this.swidth = swidth;
    this.sheight = sheight;
    this.info = info;
    this.draw = drawback;
}

// Generate deck of cards 6 pairs of polygons.
function makedeck() {
    var i;
    var acard;
    var bcard;
    var cx = firstsx;
    var cy = firstsy;
    for (i = 3; i < 9; i++) {
        acard = new Card(cx, cy, cardwidth, cardheight, i);
        deck.push(acard);
        bcard = new Card(cx, cy + cardheight + margin, cardwidth, cardheight, i);
        deck.push(bcard);
        cx = cx + cardwidth + margin;
        acard.draw();
        bcard.draw();
    }

}

function shuffle() {
    // Coded to resemble how I shuffled cards when playing concentration.
    var i;
    var k;
    var holder;
    var dl = deck.length
    var nt;
    for (nt = 0; nt < 3 * dl; nt++) {  //do the swap 3 times deck.length times
        i = Math.floor(Math.random() * dl);
        k = Math.floor(Math.random() * dl);
        holder = deck[i].info;
        deck[i].info = deck[k].info;
        deck[k].info = holder;
    }
}

// Polycard will produce the card face. Backcard will produce the common back.

function Polycard(sx, sy, rad, n) {
    this.sx = sx;
    this.sy = sy;
    this.rad = rad;
    this.draw = drawpoly;
    this.n = n;
    this.angle = (2 * Math.PI) / n;
    this.moveit = generalmove;

}

function drawpoly() {
    ctx.fillStyle = frontbgcolor;
    ctx.strokeStyle = backcolor;
    ctx.fillRect(this.sx - 2 * this.rad, this.sy - 2 * this.rad, 4 * this.rad, 4 * this.rad);
    ctx.beginPath();
    ctx.fillStyle = polycolor;
    var i;
    var rad = this.rad;
    ctx.beginPath();
    ctx.moveTo(this.sx + rad * Math.cos(-.5 * this.angle), this.sy + rad * Math.sin(-.5 * this.angle));
    for (i = 1; i < this.n; i++) {
        ctx.lineTo(this.sx + rad * Math.cos((i - .5) * this.angle), this.sy + rad * Math.sin((i - .5) * this.angle));
    }
    ctx.fill();
}

function generalmove(dx, dy) {
    this.sx += dx;
    this.sy += dy;
}

function drawback() {
    ctx.fillStyle = backcolor;
    ctx.fillRect(this.sx, this.sy, this.swidth, this.sheight);
}

function choose(ev) {
    var mx;
    var my;
    var pick1;
    var pick2;
    if (ev.layerX || ev.layerX == 0) { // Firefox
        mx = ev.layerX;
        my = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) { // Opera
        mx = ev.offsetX;
        my = ev.offsetY;
    }
    var i;
    for (i = 0; i < deck.length; i++) {
        var card = deck[i];
        if (card.sx >= 0)  //this is the way to avoid checking for clicking on this space
            if ((mx > card.sx) && (mx < card.sx + card.swidth) && (my > card.sy) && (my < card.sy + card.sheight)) {
                //check that this isn't clicking on first card
                if ((firstpick) || (i != firstcard)) break;
            }
    }
    if (i < deck.length) {  //clicked on a card
        if (firstpick) {
            firstcard = i;
            firstpick = false;
            // create poly to draw it on top of back
            pick1 = new Polycard(card.sx + cardwidth * .5, card.sy + cardheight * .5, cardrad, card.info);
            pick1.draw();
        }
        else {
            secondcard = i;
            pick2 = new Polycard(card.sx + cardwidth * .5, card.sy + cardheight * .5, cardrad, card.info);
            pick2.draw();
            if (deck[i].info == deck[firstcard].info) {
                matched = true;

                var nm = 1 + Number(document.f.count.value);
                document.f.count.value = String(nm);
                if (nm >= .5 * deck.length) {
                    var now = new Date();
                    var nt = Number(now.getTime());

                    var seconds = Math.floor(.5 + (nt - starttime) / 1000);


                    document.f.elapsed.value = String(seconds);
                    //need to fo to flipback for the last match
                }
            }
            else {
                matched = false;
            }
            firstpick = true;
            tid = setTimeout(flipback, 1000);
        }
    }
}

function flipback() {
    var card;
    if (!matched) {
        deck[firstcard].draw();
        deck[secondcard].draw();
    }
    else {
        ctx.fillStyle = tablecolor;
        ctx.fillRect(deck[secondcard].sx, deck[secondcard].sy, deck[secondcard].swidth, deck[secondcard].sheight);
        ctx.fillRect(deck[firstcard].sx, deck[firstcard].sy, deck[firstcard].swidth, deck[firstcard].sheight);
        deck[secondcard].sx = -1;
        deck[firstcard].sx = -1;
    }
}

function init() {
    canvas.addEventListener('click', choose, false);
    makedeck();
    document.f.count.value = "0";
    document.f.elapsed.value = "";
    starttime = new Date();
    starttime = Number(starttime.getTime());
    shuffle();
}
