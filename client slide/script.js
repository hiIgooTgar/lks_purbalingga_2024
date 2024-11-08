let instruction = document.getElementById("screenInstruction");
let btnStart = document.getElementById("startGame");
let username = document.getElementById("username");

function openInstruction() {
  instruction.style.display = "flex";
}

function closeInstruction() {
  instruction.style.display = "none";
}

username.addEventListener("input", () => {
  if (username.value.length > 0) {
    btnStart.disabled = false;
  } else {
    btnStart.disabled = true;
  }
});

btnStart.addEventListener("click", () => {
  window.location.href = "test.html";
});
