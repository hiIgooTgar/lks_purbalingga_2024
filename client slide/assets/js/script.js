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

  player.y = myHero.offsetTop;
  player.x = myHero.offsetLeft;

  for (let i = 0; i < 5; i++) {
    let enemy = document.createElement("div");
    enemy.setAttribute("class", "enemy");
    enemy.y = (i + 1) * 450 * -1;
    enemy.style.top = enemy.y + "px";
    enemy.style.backgroundImage = `url(./assets/images/enemy${i + 1}.png)`;
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
