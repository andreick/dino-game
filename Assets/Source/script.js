const dino = document.querySelector(".dino");
const background = document.querySelector(".background");
let isJumping = false;
let dinoPositionY = 0;

const handleKeyUp = event => {
    if (event.keyCode === 32) {
        if (!isJumping) {
            jump();
        }
    }
}

const jump = () => {
    isJumping = true;

    let upInterval = setInterval(() => {

        if (dinoPositionY >= 150) {

            clearInterval(upInterval);

            let downInterval = setInterval(() => {

                if (dinoPositionY <= 0) {
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

const createCactus = () => {
    const cactus = document.createElement("div");
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    cactus.classList.add("cactus");
    cactus.style.left = 1000 + "px";
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {

        if (cactusPosition <= -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        }
        else if (cactusPosition > 0 && cactusPosition < 60 && dinoPositionY < 60) {
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
        }
        else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + "px";
        }
    }, 20)

    setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener("keyup", handleKeyUp);