const screenFirst = document.getElementById("screenFirst");
const screenGame = document.getElementById("screenGame");
const btnGame = document.getElementById("startGame");
const instruction = document.getElementById("screenInstruction");
const leaderboard = document.getElementById("screenLeaderboard");
const username = document.getElementById("username");
const level = document.getElementById("levelGame");

let player = { speed: 2, score: 0, start: false };
let isPaused = false;
let gameLoop;
let enemyGameOver = 0;

level.addEventListener("change", () => {
  if (level.value == 1) {
    player.speed = 2;
  } else if (level.value == 2) {
    player.speed = 3;
  } else if (level.value == 3) {
    player.speed = 4;
  } else if (level.value == 4) {
    player.speed = 6;
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

  const batas = document.createElement("div");
  batas.setAttribute("class", "batas");
  screenGame.appendChild(batas);

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
      let soundOut = new Audio("./assets/sound/out.mp3");
      soundOut.play();
      enemyGameOver++;
      enemy.style.top = "-100px";
      enemy.style.left = Math.floor(Math.random() * 450) + "px";
      if (enemyGameOver >= 3) {
        gameOver();
      }
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
  let soundLaser = new Audio("./assets/sound/laser.mp3");
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
  } else if (e.key == "ArrowDown" && top <= 510) {
    myHero.style.top = top + 20 + "px";
  } else if (e.keyCode == 32) {
    fireBullet(left, top);
    soundLaser.play();
  }
});

function fireBullet(left, top) {
  let soundBoom = new Audio("./assets/sound/boom.mp3");
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
        let boomImg = document.createElement("img");
        boomImg.src = "assets/images/boom.png";
        boomImg.setAttribute("class", "boom");
        boomImg.style.left = enemy.style.left;
        boomImg.style.top = enemy.style.top;
        screenGame.appendChild(boomImg);

        setTimeout(() => {
          boomImg.remove();
        }, 300);

        soundBoom.play();
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
  }, 7);
}

function openInstruction() {
  instruction.style.display = "flex";
}

function closeInstruction() {
  instruction.style.display = "none";
}

function openLeaderboard() {
  leaderboard.style.display = "flex";
  viewLeaderboard();
}

function closeLeaderboard() {
  leaderboard.style.display = "none";
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
  } else if (player.speed == 3) {
    detailLevel = "Normal";
  } else if (player.speed == 4) {
    detailLevel = "Hard";
  } else if (player.speed == 6) {
    detailLevel = "Very Hard";
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
  generateEnemy();
}

function quitgame() {
  enemyGameOver = 0;
  isPaused = false;
  player.start = false;
  window.location.reload();
}

function gameOver() {
  player.start = false;
  isPaused = true;

  let detailLevel;
  if (player.speed == 2) {
    detailLevel = "Easy";
  } else if (player.speed == 3) {
    detailLevel = "Normal";
  } else if (player.speed == 4) {
    detailLevel = "Hard";
  } else if (player.speed == 6) {
    detailLevel = "Very Hard";
  }

  getLeaderboard(username.value, player.score, detailLevel);

  const gameOverScreen = document.createElement("section");
  gameOverScreen.id = "screenGameOver";
  gameOverScreen.innerHTML = `
  <main>
        <div class="content">
          <h1>Game Over</h1>
          <div class="detail">
            <h5>Username : ${username.value}</h5>
            <h5>Points : ${player.score}</h5>
            <h5>Level : ${detailLevel}</h5>
          </div>
          <div class="btn-content">
            <button id="restratGame">Restart</button>
          </div>
        </div>
      </main>
  `;

  document.body.appendChild(gameOverScreen);
  gameOverScreen.addEventListener("click", quitgame);
}

function getLeaderboard(username, score, level) {
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  leaderboard.push({ username, score, level });
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

function viewLeaderboard() {
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  const leaderboardContent = document.querySelector(
    ".screenLeaderboard .content .list .detail"
  );

  leaderboardContent.innerHTML = `
    <ol>
      <h4>Username</h4>
      <p>Igo JSON</p>
      ${leaderboard.map((u) => `<p>${u.username}</p>`).join("")}
    </ol>
    <ol>
      <h4>Level</h4>
      <p>Very Hard</p>
      ${leaderboard.map((l) => `<p>${l.level}</p>`).join("")}
    </ol>
    <ol>
      <h4>Score</h4>
      <p>5000000</p>
      ${leaderboard.map((s) => `<p>${s.score}</p>`).join("")}
    </ol>
  `;
}

function clearLeaderboard() {
  localStorage.removeItem("leaderboard");
}

window.onload = function () {
  var mobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  if (mobile) {
    var device = document.createElement("div");
    device.setAttribute("class", "device-game");
    device.innerHTML = `
        <img src="./assets/images/warning.png" alt="Waring" />
        <h1>Untuk memainkan gamenya harap menggunakan <span>Komputer/Laptop</span></h1>
        <br>
        <h2><i>Terima Kasih</i></h2>
    `;
    document.body.appendChild(device);
  }
};
