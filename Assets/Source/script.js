const dino = document.querySelector(".dino");
const background = document.querySelector(".background");
let isRunning = false;
let isJumping;
let dinoPositionY;

function start() {
    isJumping = false;
    dinoPositionY = 0;
    dino.style.bottom = dinoPositionY + "px";

    while (background.lastChild !== dino) {
        background.removeChild(background.lastChild);
    }
    background.style.webkitAnimationPlayState = "running";

    isRunning = true;
    setTimeout(createCactus, 1000);
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
                    dinoPositionY -= 20;
                    dino.style.bottom = dinoPositionY + "px";
                }
            }, 20);
        }
        else {
            dinoPositionY += 20;
            dino.style.bottom = dinoPositionY + "px";
        }
    }, 20);
}

function createCactus() {

    const cactus = document.createElement("div");
    let cactusPosition = 1000;
    let randomTime = Math.random() * (3250 - 750) + 750;
    console.log(randomTime);

    cactus.classList.add("cactus");
    cactus.style.left = 1000 + "px";
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {

        if (!isRunning) {
            clearTimeout(spawn);
            clearInterval(leftInterval);
        }
        else if (cactusPosition <= -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        }
        else if (cactusPosition >= 30 && cactusPosition <= 90 && dinoPositionY <= 60) {
            clearTimeout(spawn);
            clearInterval(leftInterval);
            isRunning = false;
            background.style.webkitAnimationPlayState = "paused";
        }
        else {
            cactusPosition -= 5;
            cactus.style.left = cactusPosition + "px";
        }
    }, 20)

    let spawn = setTimeout(createCactus, randomTime);
}

document.addEventListener("keyup", event => {
    if (!isRunning && event.key === " ") {
        start();
    }
});

document.addEventListener("keydown", event => {
    if (isRunning && event.key === " ") {
        if (!isJumping) {
            jump();
        }
    }
});