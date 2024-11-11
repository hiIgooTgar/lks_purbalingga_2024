const screenFirst = document.getElementById("screenFirst");
const screenGame = document.getElementById("screenGame");
const btnGame = document.getElementById("startGame");

let instruction = document.getElementById("screenInstruction");
let username = document.getElementById("username");
let level = document.getElementById("levelGame");
let player = {};

level.addEventListener("change", () => {
  if (level.value == 1) {
    player.speed = 2;
  } else if (level.value == 2) {
    player.speed = 3;
  } else if (level.value == 3) {
    player.speed = 4;
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

function mainGame() {
  let myHero = document.querySelector(".myHero");
  if (player.start) {
    moveEnemy(myHero);
    window.requestAnimationFrame(mainGame);
  }
}

window.addEventListener("keydown", (e) => {
  let myHero = document.querySelector(".myHero");
  var leftArrow = parseInt(
    window.getComputedStyle(myHero).getPropertyValue("left")
  );
  var topArrow = parseInt(
    window.getComputedStyle(myHero).getPropertyValue("top")
  );
  if (e.key == "ArrowLeft" && leftArrow > 0) {
    myHero.style.left = leftArrow - 20 + "px";
  } else if (e.key == "ArrowRight" && leftArrow <= 519) {
    myHero.style.left = leftArrow + 20 + "px";
  } else if (e.key == "ArrowUp" && topArrow > 0) {
    myHero.style.top = topArrow - 20 + "px";
  } else if (e.key == "ArrowDown" && topArrow > 0) {
    myHero.style.top = topArrow + 20 + "px";
  }

  if (e.keyCode == 32) {
    var bullets = document.createElement("div");
    bullets.setAttribute("class", "bullets");
    screenGame.append(bullets);

    bullets.style.left = leftArrow + 20 + "px";
    bullets.style.bottom = topArrow + 20 + "px";

    var moveBullets = setInterval(() => {
      var enemy = document.querySelectorAll(".enemy");
      for (var i = 0; i < enemy.length; i++) {
        var emy = enemy[i];
        var emyBound = emy.getBoundingClientRect();
        var bulletBound = bullets.getBoundingClientRect();

        if (
          bulletBound.left >= emyBound.left &&
          bulletBound.right <= emyBound.right &&
          bulletBound.top <= emyBound.top &&
          bulletBound.bottom <= emyBound.bottom
        ) {
          emy.parentElement.removeChild(emy);
          bullets.parentElement.removeChild(bullets);

          var score = document.querySelector(".score");
          if (score) {
            score.innerHTML =
              "Points: " + (parseInt(score.innerHTML.split(":")[1]) + 100);
          } else {
            score = document.createElement("div");
            score.setAttribute("class", "score");
            score.innerHTML = "Points: 100";
            screenGame.append(score);
          }
        }
      }

      var bulletsBottom = parseInt(
        window.getComputedStyle(bullets).getPropertyValue("bottom")
      );
      if (bulletsBottom >= 500) {
        clearInterval(moveBullets);
        bullets.remove();
      }

      bullets.style.bottom = bulletsBottom + 5 + "px";
    }, 50);
  }
});

function moveEnemy() {
  let enemy = document.querySelectorAll(".enemy");
  enemy.forEach((enemy, index) => {
    if (enemy.y >= 750) {
      enemy.y = -300;
      enemy.style.left = Math.floor(Math.random() * 450) + "px";
    }

    enemy.y += player.speed;
    enemy.style.top = enemy.y + "px";
  });
}

function startGame() {
  player.start = true;
  screenFirst.classList.add("hide");
  screenGame.classList.remove("hide");
  screenGame.innerHTML = "";

  window.requestAnimationFrame(mainGame);

  let title_user = document.createElement("h5");
  title_user.setAttribute("class", "title_user");
  title_user.innerHTML = `Username : ` + username.value;
  screenGame.append(title_user);

  let myHero = document.createElement("div");
  myHero.setAttribute("class", "myHero");
  screenGame.append(myHero);

  let numEnemy = level.value * 5;

  for (let i = 0; i < numEnemy; i++) {
    let enemy = document.createElement("div");
    enemy.setAttribute("class", "enemy");
    enemy.y = (i + 1) * 450 * -1;
    enemy.style.top = enemy.y + "px";
    enemy.style.backgroundImage = `url(./assets/images/enemy${
      (i % 5) + 1
    }.png)`;
    enemy.style.left = Math.floor(Math.random() * 450) + "px";
    screenGame.append(enemy);
  }
}

function openInstruction() {
  instruction.style.display = "flex";
}

function closeInstruction() {
  instruction.style.display = "none";
}
