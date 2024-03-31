// Create the cards
var tagString = "";
for (let i = 0; i < 32; i++) {
    tagString += `<div class="card-container">
    <div class="card c${i}" onclick="flipCard('c${i}', ${i % 16})">
        <div class="back b${i % 16}"></div>
        <div class="front"></div>
    </div>
</div>`;
}
const range = document.createRange();
const div = document.querySelector(".grid-container");
range.selectNode(document.querySelector(".main-container"));
const documentFragment = range.createContextualFragment(tagString);
div.appendChild(documentFragment);

// Shuffle the cards at the beginning of the game.
Shuffle();


var firstCard = null;

async function flipCard(n, id) {
    let card = document.querySelector(`.${n}`);
    card.classList.add("active");
    if (!firstCard) firstCard = [card, id];
    else {
        if (id == firstCard[1]) console.log("yeah");
        else {
            document.body.classList.add("unclickable");
            await sleep(1.5);
            firstCard[0].classList.remove("active");
            card.classList.remove("active");  
            document.body.classList.remove("unclickable");    
        }
        firstCard = null;
        }
    let cards = document.querySelectorAll(".card.active");
    if (cards.length == 32) {
        document.querySelector(".restart").style.display = "block";
    }
}
async function sleep(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}
function Shuffle() {
    document.querySelector(".restart").style.display = "none";
    const cards = document.querySelectorAll(".card-container");
    for (let i= 0; i < cards.length; i++) {
        cards[i].style.order = Math.floor(Math.random() * 100);
    }
}
function restart() {
    Shuffle();
    let cards = document.querySelectorAll(".card.active");
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.remove("active");
    }
}