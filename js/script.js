const dino = document.querySelector("#dino");
const background = document.querySelector("#background");
const gameStart = document.querySelector("#game-start");
const gameOver = document.querySelector(".game-over");
const restart = document.querySelector("#restart");
const scoreElement = document.querySelector(".score");
let keyPressed = false;
let isRunning = false;
let isJumping;
let dinoPositionY;
let scoreInterval;

let spawnTimeMin;
let spawnTimeMax;
let cactusSpeed;
let jumpSpeed = 12;
const cacti = ["cactus1", "cactus2", "cactus3", "cactus4", "cactus1", "cactus2", "cactus3", "cactus1", "cactus2"];

function start() {

    while (background.lastChild !== dino) {
        background.removeChild(background.lastChild);
    }

    isJumping = false;
    dinoPositionY = 0;
    gameOver.innerHTML = "";
    restart.style.visibility = "hidden";
    dino.style.bottom = dinoPositionY + "px";
    dino.style.backgroundImage = "url(images/dino.png)";
    background.style.webkitAnimationPlayState = "running";

    isRunning = true;
    setTimeout(createCactus, 1500);
    startScore();
}

function jump() {

    isJumping = true;
    jumpSound.play();

    let upInterval = setInterval(() => {

        if (!isRunning) {
            clearInterval(upInterval);
        }
        else if (dinoPositionY >= 140) {

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
    let randomCactus = cacti[Math.floor(Math.random() * cacti.length)];

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
            deathSound.play();
            background.style.webkitAnimationPlayState = "paused";
            dino.style.backgroundImage = "url(images/dino-dead.png)";
            gameOver.innerHTML = '<h2 class="game-over">FIM DE JOGO</h2>';
            restart.style.visibility = "visible";
        }
        else {
            cactusPositionX -= cactusSpeed;
            cactus.style.left = cactusPositionX + "px";
        }
    }, 20)

    let spawnTime = Math.random() * (spawnTimeMax - spawnTimeMin) + spawnTimeMin;
    let spawn = setTimeout(createCactus, spawnTime);
}

function startScore() {
    
    scoreElement.innerHTML = '<p class="score">00000</p>';
    let score = 0;
    cactusSpeed = 10;
    spawnTimeMin = 500;
    spawnTimeMax = 2000;

    scoreInterval = setInterval(() => {
        score++;
        scoreElement.innerHTML = '<p class="score">' + score.toString().padStart(5, "0") + '</p>';

        if (score % 100 === 0) {
            scoreSound.play();
            cactusSpeed++;
            spawnTimeMin -= 3;
            spawnTimeMax -= 3;
        }
    }, 100);
}

class Sound {

    constructor(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
    }

    play = function () {
        this.sound.play();
    };
}

let jumpSound = new Sound("audio/jump-sound-effect.mp3");
let scoreSound = new Sound("audio/score-sound-effect.mp3");
let deathSound = new Sound("audio/death-sound-effect.mp3");
scoreSound.sound.volume = 0.3;

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