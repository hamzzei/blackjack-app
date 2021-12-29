let cards = document.getElementById("cards");
let total = document.getElementById("total");
let gameStatus = document.getElementById("status");
let playerInfo = document.getElementById("player-info");
let homePage = document.getElementById("home-page");
let inGame = document.getElementById("in-game");
let score = 0;
let isAlive = false;
let blackjack = false;
let allCards = [];
let displayCards = [];
let totalScore = 100;
let player = {
    points: totalScore
}

function beginNewGame() {

    let playerName;

    if (document.getElementById("name-input").value !== "") {
        playerName = document.getElementById("name-input").value;
    } else {
        return;
    }

    player.name = playerName; 
    
    totalScore = 100;
    score = 0;
    isAlive = false;
    blackjack = false;
    allCards = [];
    displayCards = [];

    visible();
    updateScore();
    renderGame();
}

function visible() {
    inGame.classList.toggle("visible");
    inGame.classList.toggle("invisible");
    homePage.classList.toggle("visible");
    homePage.classList.toggle("invisible");
}

function randomCard() {
    let num = Math.floor(Math.random() * 13) + 1;
    if (num === 1) {
        displayCards.push("A");
        return 11;
    } else if (num === 11) {
        displayCards.push("J");
        return 10;
    } else if (num === 12) {
        displayCards.push("Q");
        return 10;
    } else if (num === 13) {
        displayCards.push("K");
        return 10;
    } else {
        displayCards.push(num);
        return num;
    }
}

function startGame() {
    if (isAlive && score !== 21) {
        return;
    } else if (score >= 21) {
    score = 0;
    blackjack = false;
    allCards = [];
    displayCards = [];
    }

    isAlive = true;
    let firstCard = randomCard();
    let secondCard = randomCard();

    allCards.push(firstCard, secondCard);

    renderGame();
}

function renderGame() {

    cards.textContent = "Cards Drawn: "
    score = 0;
    
    for (let i = 0; i < allCards.length; i++){
        cards.textContent += displayCards[i] + " ";
        score += allCards[i];
    }

    total.textContent = "Total: " + score;

    if (score === 21) {
        blackjack = true;
        isAlive = false;
        gameStatus.textContent  = "You Got Blackjack!";
        totalScore += 60;
        updateScore();
    } else if (score < 21) {
        gameStatus.textContent = "Would You Like to Draw a Card?";
    } else {
        isAlive = false;
        gameStatus.textContent = "Over 21! Game Over";
        totalScore -= 10;
        updateScore();
    }

    
}

function newCard() {
    if (!isAlive) {
        return;
    }

    let card = randomCard();
    allCards.push(card);

    renderGame();
}

function updateScore() {
    if (totalScore <= 0) {
        playerInfo.textContent = player.name + ": Out";
        visible();
    } else {
        playerInfo.textContent = `Player: ${player.name} || Score: ${totalScore}`;
    }
}