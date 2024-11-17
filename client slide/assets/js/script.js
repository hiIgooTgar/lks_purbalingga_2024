const screenFirst = document.getElementById("screenFirst");
const screenGame = document.getElementById("screenGame");
const btnGame = document.getElementById("startGame");
const instruction = document.getElementById("screenInstruction");
const username = document.getElementById("username");
const level = document.getElementById("levelGame");

let player = { speed: 2, score: 0, start: false };
let isPaused = false;
let gameLoop;

level.addEventListener("change", () => {
  if (level.value == 1) {
    player.speed = 2;
  } else if (level.value == 2) {
    player.speed = 4;
  } else if (level.value == 3) {
    player.speed = 5;
  }
});

window.addEventListener("input", () => {
  if (username.value.length > 0 && level.value != 0) {
    btnGame.disabled = false;
  } else {
    btnGame.disabled = true;
  }
});

btnGame.addEventListener("click", startGame);

function startGame() {
  player.start = true;
  player.score = 0;

  screenFirst.classList.add("hide");
  screenGame.classList.remove("hide");
  screenGame.innerHTML = "";

  const title_user = document.createElement("h5");
  title_user.setAttribute("class", "title_user");
  title_user.innerHTML = `Username : ${username.value}`;
  screenGame.appendChild(title_user);

  const myHero = document.createElement("div");
  myHero.setAttribute("class", "myHero");
  screenGame.appendChild(myHero);

  const score = document.createElement("div");
  score.setAttribute("class", "score");
  score.innerHTML = `Points : 0`;
  screenGame.appendChild(score);

  window.requestAnimationFrame(mainGame);

  generateEnemy();
}

function mainGame() {
  if (player.start && !player.isPaused) {
    moveEnemy();
    window.requestAnimationFrame(mainGame);
  }
}

function moveEnemy() {
  const enemies = document.querySelectorAll(".enemy");
  enemies.forEach((enemy) => {
    let currentTop = parseInt(enemy.style.top.replace("px", ""));
    if (currentTop > 750) {
      enemy.style.top = "-100px";
      enemy.style.left = Math.floor(Math.random() * 450) + "px";
    } else {
      enemy.style.top = currentTop + player.speed + "px";
    }
  });
}

function generateEnemy() {
  setInterval(() => {
    if (player.start) {
      const enemy = document.createElement("div");
      enemy.setAttribute("class", "enemy");
      enemy.style.top = "-100px";
      enemy.style.left = Math.floor(Math.random() * 450) + "px";
      enemy.style.backgroundImage = `url(./assets/images/enemy${
        Math.floor(Math.random() * 5) + 1
      }.png)`;
      screenGame.appendChild(enemy);
    }
  }, 1500);
}

window.addEventListener("keydown", (e) => {
  const myHero = document.querySelector(".myHero");
  const left = parseInt(
    window.getComputedStyle(myHero).getPropertyValue("left")
  );
  const top = parseInt(window.getComputedStyle(myHero).getPropertyValue("top"));
  if (e.key == "ArrowLeft" && left > 0) {
    myHero.style.left = left - 20 + "px";
  } else if (e.key == "ArrowRight" && left <= 515) {
    myHero.style.left = left + 20 + "px";
  } else if (e.key == "ArrowUp" && top > 450) {
    myHero.style.top = top - 20 + "px";
  } else if (e.key == "ArrowDown" && top <= 500) {
    myHero.style.top = top + 20 + "px";
  } else if (e.keyCode == 32) {
    fireBullet(left, top);
  }
});

function fireBullet(left, top) {
  const bullets = document.createElement("div");
  bullets.setAttribute("class", "bullets");
  bullets.style.left = left + 20 + "px";
  bullets.style.top = top + "px";
  screenGame.appendChild(bullets);

  const moveBullets = setInterval(() => {
    const enemies = document.querySelectorAll(".enemy");
    const bulletTop = parseInt(bullets.style.top.replace("px", ""));

    enemies.forEach((enemy) => {
      const emyBound = enemy.getBoundingClientRect();
      const bulletBound = bullets.getBoundingClientRect();

      if (
        bulletBound.left >= emyBound.left &&
        bulletBound.right <= emyBound.right &&
        bulletBound.top <= emyBound.bottom &&
        bulletBound.bottom >= emyBound.top
      ) {
        enemy.remove();
        bullets.remove();
        clearInterval(moveBullets);

        player.score += 100;
        document.querySelector(".score").innerHTML = `Points : ${player.score}`;
      }
    });

    if (bulletTop <= 0) {
      bullets.remove();
      clearInterval(moveBullets);
    }

    bullets.style.top = bulletTop - 5 + "px";
  }, 10);
}

function openInstruction() {
  instruction.style.display = "flex";
}

function closeInstruction() {
  instruction.style.display = "none";
}

document.addEventListener("keyup", (e) => {
  if (e.key == "Escape") {
    if (!isPaused) pauseGame();
  }
});

function pauseGame() {
  isPaused = true;
  player.start = false;
  clearInterval(gameLoop);

  let detailLevel;
  if (player.speed == 2) {
    detailLevel = "Easy";
  } else if (player.speed == 4) {
    detailLevel = "Medium";
  } else if (player.speed == 5) {
    detailLevel = "Hard";
  }

  const pauseOverlay = document.createElement("section");
  pauseOverlay.id = "screenPause";
  pauseOverlay.innerHTML = `
  <main>
        <div class="content">
          <h1>Game Pause</h1>
          <div class="detail">
            <h5>Username : ${username.value}</h5>
            <h5>Points : ${player.score}</h5>
            <h5>Level : ${detailLevel}</h5>
          </div>
          <div class="btn-content">
            <button id="lanjutGame">Lanjut</button>
            <button id="keluarGame">Keluar Game</button>
          </div>
        </div>
      </main>
  `;
  screenGame.appendChild(pauseOverlay);

  document.getElementById("lanjutGame").addEventListener("click", resumeGame);
  document.getElementById("keluarGame").addEventListener("click", quitgame);
}

function resumeGame() {
  isPaused = false;
  player.start = true;
  document.getElementById("screenPause").remove();
  window.requestAnimationFrame(mainGame);
  generateEnemies();
}

function quitgame() {
  isPaused = false;
  player.start = false;
  window.location.reload();
}
