// script.js

// Variable declarations.
let thingelem;
let nq = 4;         // Number of facts presented.


let col1 = 20;
let row1 = 100;
let rowsize = 50;
let slots = [];

let answertext = " ";
let functionreference;
let image;
let song;
let v;
let res;
let ans;

let facts = [
    ["George Washington", false],
    ["John Adams", false],
    ["Thomas Jefferson", false],
    ["James Madison", false],
    ["James Monroe", false],
    ["John Quincy Adams", false],
    ["Andrew Jackson", false],
    ["Martin Van Buren", false],
    ["William Harrison", false],
    ["John Tyler", false],
    ["James Polk", false],
    ["Zachary Taylor", false],
    ["Millard Fillmore", false],
    ["Franklin Pierce", false],
    ["James Buchanan", false],
    ["Abraham Lincoln", false],
    ["Andrew Johnson", false],
    ["Ulysses Grant", false],
    ["Rutherford Hayes", false],
    ["James Garfield", false],
    ["Chester Arthur", false],
    ["Grover Cleveland (1)", false],
    ["Benjamin Harrison", false],
    ["Grover Cleveland (2)", false],
    ["William McKinley", false],
    ["Theodore Roosevelt", false],
    ["William Taft", false],
    ["Woodrow Wilson", false],
    ["Warren Harding", false],
    ["Calvin Coolidge", false],
    ["Herbert Hoover", false],
    ["Franklin Roosevelt", false],
    ["Harry Truman", false],
    ["Dwight Eisenhower", false],
    ["John Kennedy", false],
    ["Lyndon Johnson", false],
    ["Richard Nixon", false],
    ["Gerald Ford", false],
    ["Jimmy Carter", false],
    ["Ronald Reagan", false],
    ["George H. W. Bush", false],
    ["Bill Clinton", false],
    ["George W. Bush", false],
    ["Barack Obama", false],
    ["Donald Trump", false]

];

document.addEventListener('DOMContentLoaded', init);

function init() {
    res = document.getElementById("results");
    ans = document.getElementById("answer");

    functionreference = pickElement;
    image = document.getElementById("image");
    audio = document.getElementById("audio");
    video = document.getElementById("video");
    row1 = .5 * window.innerHeight;

    setUpGame();
}

function setUpGame() {
    slots = [];
    answertext = "";
    let i;
    let c;
    let mx = col1;
    let my = row1;
    let d;
    let uniqueid;

    // Mark all facts as not being used.
    for (i = 0; i < facts.length; i++) {
        facts[i][2] = false;
    }

    for (i = 0; i < nq; i++) {
        do { c = Math.floor(Math.random() * facts.length); }
        while (facts[c][1] == true)  // Get an unused fact.
        facts[c][1] = true;
        uniqueid = "p" + String(c);
        d = document.createElement('pres');
        d.innerHTML =
            "<div  class='thing' id='" + uniqueid + "'>placeholder</div>";

        const gameBoard = document.getElementById("game-board");
        gameBoard.append(d);

        thingelem = document.getElementById(uniqueid);
        thingelem.textContent = String(i + 1) + ": " + facts[c][0];
        thingelem.style.top = String(my) + "px";
        thingelem.style.left = String(mx) + "px";
        thingelem.addEventListener('click', pickElement);

        my += rowsize;
    }
}

function pickElement(ev) {
    var answert; //the number 1, 2, etc.
    var positiont; //position in original array as text
    var positionn;  //position as number

    positiont = this.id.substring(1); //remove the first letter of id, 
    answert = this.textContent.substring(0, 1);  //works if less than 10 choices
    answertext = answertext + answert + " ";
    ans.innerHTML = answertext;
    positionn = Number(positiont);
    this.style.backgroundColor = "gold";
    this.removeEventListener('click', functionreference);
    slots.push(positionn);

    if (slots.length == nq) {
        checkOrder();
    }
}

function checkOrder() {
    let ok = true;
    for (var i = 0; i < nq - 1; i++) {
        if (slots[i] > slots[i + 1]) {
            ok = false;
            break;
        }
    }
    if (ok) {
        res.innerHTML = "CORRECT";

        image.remove();

        audio.style.visibility = "visible";
        audio.currentTime = 4;
        audio.play();

        video.style.visibility = "visible";
        video.style.display = "block";
        video.currentTime = 0;
        video.play();
    }
    else {
        res.innerHTML = "WRONG";
    }
}
