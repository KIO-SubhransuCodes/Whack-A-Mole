const holes = document.querySelectorAll(".hole");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const startBtn = document.getElementById("start");
const gameWrapper = document.getElementById("gameWrapper");
const finalScreen = document.getElementById("finalScreen");
const finalText = document.getElementById("finalText");

let score = 0;
let time = 15;
let moleTimer;
let gameTimer;

scoreDisplay.textContent = score;
timeDisplay.textContent = time;

function clearMoles() {
    holes.forEach(hole => {
        hole.classList.remove("mole");
        hole.style.transform = "scale(1)";
    });
}

function spawnMole() {
    clearMoles();
    const index = Math.floor(Math.random() * holes.length);
    holes[index].classList.add("mole");
}

holes.forEach(hole => {
    hole.addEventListener("click", () => {
        if (hole.classList.contains("mole") && time > 0) {
            score++;
            scoreDisplay.textContent = score;
            hole.classList.remove("mole");
            hole.style.transform = "scale(0.9)";
            setTimeout(() => hole.style.transform = "scale(1)", 100);
        }
    });
});

startBtn.addEventListener("click", () => {
    clearInterval(moleTimer);
    clearInterval(gameTimer);

    score = 0;
    time = 15;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = time;

    startBtn.classList.add("hidden");

    moleTimer = setInterval(spawnMole, 900);

    gameTimer = setInterval(() => {
        time--;
        timeDisplay.textContent = time;

        if (time === 0) endGame();
    }, 1000);
});

function endGame() {
    clearInterval(moleTimer);
    clearInterval(gameTimer);
    clearMoles();

    gameWrapper.classList.add("hidden");
    finalScreen.classList.remove("hidden");
    finalText.textContent = "FINAL SCORE : " + score;
}
