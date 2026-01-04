// script.js

// Get the HTML Canvas element, and it's 2d context.
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Variable declarations.
canvas.width = 680;
canvas.height = 380;

let firstpick = true;
let firstcard = -1;
let secondcard;
let backcolor = "rgb(128,0,128)";
let tablecolor = "rgb(255,255,255)";
let deck = [];
let firstsx = 30;
let firstsy = 50;
let margin = 30;
let cardwidth = 100;
let cardheight = 100;
let tid;
let matched;
let starttime;
let count = 0;
let pairs = [
    ["anneGorge.jpg", "anneNow.jpg"],
    ["esther.jpg", "pigtailEsther.jpg"],
    ["pigtailJeanine.jpg", "jeanineGorge.jpg"],
    ["pigtailAviva.jpg", "avivaCuba.jpg"],
    ["pigtailAnnika.jpg", "annikaTooth.jpg"]
]

/* Deck holds info on the cards: the location and dimensions, the src for the picture and
   identifying info. The info is set using the array of arrays in the makedeck function. */

function Card(sx, sy, swidth, sheight, img, info) {
    this.sx = sx;
    this.sy = sy;
    this.swidth = swidth;
    this.sheight = sheight;
    this.info = info;
    this.img = img;
    this.draw = drawback;
}

// Generate deck of cards 6 pairs of polygons.
function makedeck() {
    var i;
    var acard;
    var bcard;
    var pica;
    var picb;
    var cx = firstsx;
    var cy = firstsy;
    for (i = 0; i < pairs.length; i++) {
        pica = new Image();
        pica.src = pairs[i][0];
        acard = new Card(cx, cy, cardwidth, cardheight, pica, i);
        deck.push(acard);
        picb = new Image();
        picb.src = pairs[i][1];
        bcard = new Card(cx, cy + cardheight + margin, cardwidth, cardheight, picb, i);
        deck.push(bcard);
        cx = cx + cardwidth + margin;
        acard.draw();
        bcard.draw();
    }
}

function shuffle() {
    /* Coded to resemble how I shuffled cards when playing concentration. Swaps
       the changing information: the img and the info indicating the matching. */
    var i;
    var k;
    var holderinfo;
    var holderimg;
    var dl = deck.length
    var nt;

    // Do the swap 3 * deck.length times.
    for (nt = 0; nt < 3 * dl; nt++) {
        i = Math.floor(Math.random() * dl);
        k = Math.floor(Math.random() * dl);
        holderinfo = deck[i].info;
        holderimg = deck[i].img;
        deck[i].info = deck[k].info;
        deck[i].img = deck[k].img;
        deck[k].info = holderinfo;
        deck[k].img = holderimg;
    }
}

function drawback() {
    ctx.fillStyle = backcolor;
    ctx.fillRect(this.sx, this.sy, this.swidth, this.sheight);
}

function choose(ev) {
    var out;
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
                if ((firstpick) || (i != firstcard)) {
                    break;
                }
            }
    }
    if (i < deck.length) {  //clicked on a card
        if (firstpick) {
            firstcard = i;
            firstpick = false;
            ctx.drawImage(card.img, card.sx, card.sy, card.swidth, card.sheight);
        }
        else {
            secondcard = i;
            ctx.drawImage(card.img, card.sx, card.sy, card.swidth, card.sheight);
            if (card.info == deck[firstcard].info) {
                matched = true;
                count++;
                ctx.fillStyle = tablecolor;
                ctx.fillRect(10, 340, 900, 100);
                ctx.fillStyle = backcolor;
                ctx.fillText("Number of matches so far: " + String(count), 10, 360);
                if (count >= .5 * deck.length) {
                    var now = new Date();
                    var nt = Number(now.getTime());
                    var seconds = Math.floor(.5 + (nt - starttime) / 1000);
                    ctx.fillStyle = tablecolor;
                    ctx.fillRect(0, 0, 900, 400);
                    ctx.fillStyle = backcolor;
                    out = "You finished in " + String(seconds) + " secs.";
                    ctx.fillText(out, 10, 100);
                    ctx.fillText("Re-load the page to try again.", 10, 300);
                    return;
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
    canvas.addEventListener('click', choose);
    makedeck();
    shuffle();
    ctx.font = "bold 20pt sans-serif";
    ctx.fillText("Click on two cards to make a match.", 10, 30);
    ctx.fillText("Number of matches so far: 0", 10, 360);
    starttime = new Date();
    starttime = Number(starttime.getTime());
}
