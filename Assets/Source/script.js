const dino = document.querySelector(".dino");
const background = document.querySelector(".background");
const gameStart = document.querySelector("#game-start");
const gameOver = document.querySelector("#game-over");
const restart = document.querySelector("#restart");
const scoreElement = document.querySelector("#score");
let keyPressed = false;
let isRunning = false;
let isJumping;
let dinoPositionY;
let score;
let scoreInterval

let jumpSpeed = 12;
const cacti = ["cactus1", "cactus2", "cactus3", "cactus4", "cactus1", "cactus2", "cactus3"];

function start() {
    isJumping = false;
    dinoPositionY = 0;
    dino.style.bottom = dinoPositionY + "px";

    while (background.lastChild !== dino) {
        background.removeChild(background.lastChild);
    }

    gameOver.innerHTML = "";
    restart.style.visibility = "hidden";
    dino.style.backgroundImage = "url(../Images/dino.png)";
    background.style.webkitAnimationPlayState = "running";

    isRunning = true;
    setTimeout(createCactus, 1000);
    startScore();
}

function jump() {
    isJumping = true;

    let upInterval = setInterval(() => {

        if (!isRunning) {
            clearInterval(upInterval);
        }
        else if (dinoPositionY >= 150) {

            clearInterval(upInterval);

            let downInterval = setInterval(() => {

                if (!isRunning) {
                    clearInterval(downInterval);
                }
                else if (dinoPositionY <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                }
                else {
                    dinoPositionY -= jumpSpeed;
                    dino.style.bottom = dinoPositionY + "px";
                }
            }, 20);
        }
        else {
            dinoPositionY += jumpSpeed;
            dino.style.bottom = dinoPositionY + "px";
        }
    }, 20);
}

function createCactus() {

    let cactusPositionX = 1000;
    randomCactus = cacti[Math.floor(Math.random() * cacti.length)];

    const cactus = document.createElement("div");
    cactus.classList.add(randomCactus);
    cactus.style.left = 1030 + "px";
    background.appendChild(cactus);
    let cactusWidth = cactus.offsetWidth;
    let dangerZoneX = 70 - cactusWidth;
    let cactusHeight = cactus.offsetHeight;

    let leftInterval = setInterval(() => {

        if (!isRunning) {
            clearTimeout(spawn);
            clearInterval(leftInterval);
        }
        else if (cactusPositionX <= -cactusWidth) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        }
        else if (cactusPositionX <= 70 && dinoPositionY <= cactusHeight && cactusPositionX >= dangerZoneX) {
            clearTimeout(spawn);
            clearInterval(leftInterval);
            clearInterval(scoreInterval);
            isRunning = false;
            background.style.webkitAnimationPlayState = "paused";
            dino.style.backgroundImage = "url(../Images/dino-dead.png)";
            gameOver.innerHTML = '<h2 id="game-over">FIM DE JOGO</h2>';
            restart.style.visibility = "visible";
        }
        else {
            cactusPositionX -= 10;
            cactus.style.left = cactusPositionX + "px";
        }
    }, 20)

    let randomTime = Math.random() * (3000 - 500) + 500;
    let spawn = setTimeout(createCactus, randomTime);
}

function startScore() {
    
    score = 0;

    scoreInterval = setInterval(() => {
        scoreElement.innerHTML = '<p id="score">' + score.toString().padStart(5, "0") + '</p>';
        score++;
    }, 100);
}

document.addEventListener("keyup", event => {

    if (!isRunning) {

        if (event.key === " " && !keyPressed) {
            start();
        }

        keyPressed = false;
    }
    
});

document.addEventListener("keydown", event => {

    if (isRunning) {

        if (event.key === " ") {

            keyPressed = true;

            if (!isJumping) {
                jump();
            }
        }
    }
});