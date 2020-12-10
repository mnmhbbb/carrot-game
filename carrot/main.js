"use strict";

//게임 맵 랜덤배치
const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const field = document.querySelector(".main");
const fieldRect = field.getBoundingClientRect();
const palyBtn = document.querySelector(".game__play");
const gameTimer = document.querySelector(".game__time");
const gameScore = document.querySelector(".game__score");
const popUp = document.querySelector(".pop-up");
const popUpMessage = document.querySelector(".pop-up__ending");
const popUpBtn = document.querySelector(".pop-up__replay");

//게임의 상태를 기억할 변수 선언해놓기
let started = false;
let score = 0;
let timer = undefined;

field.addEventListener("click", onFieldClick);

palyBtn.addEventListener("click", () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

//게임 종료
function finishGame(win) {
  started = false;
  pauseHide();
  stopTimer(); //이걸 빼먹었더니 시간 버그가 자꾸 발생했음.
  showPopUp(win ? "YOU WON!" : "YOU LOST");
}

//게임 중지
function stopGame() {
  started = false;
  stopTimer();
  pauseHide();
  showPopUp("REPLAY?");
}

//게임 시작
function startGame() {
  started = true;
  score = 0;
  initGame();
  btnPause();
  showTimerAndScore();
  startTimer();
}

function stopTimer() {
  clearInterval(timer);
}

//타이머 작동
function startTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimer(remainingTimeSec);
  timer = setInterval(() => {
    updateTimer(--remainingTimeSec);
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      finishGame(CARROT_COUNT === score);
      return;
    }
  }, 1000);
}

function updateTimer(time) {
  const seconds = time % 60;
  gameTimer.innerHTML = `00:0${seconds}`;
}

function showPopUp(text) {
  popUp.classList.remove("pop-up--hide");
  popUpMessage.innerHTML = text;
}

popUpBtn.addEventListener("click", () => {
  startGame();
  popUp.classList.add("pop-up--hide");
});

function pauseHide() {
  palyBtn.style.visibility = "hidden";
}

function showTimerAndScore() {
  gameTimer.style.visibility = "visible";
  gameScore.style.visibility = "visible";
}

function btnPause() {
  const icon = document.querySelector(".fas");
  icon.classList.remove("fa-play");
  icon.classList.add("fa-pause");
  palyBtn.style.visibility = "visible";
}

function initGame() {
  field.innerHTML = "";
  gameScore.innerHTML = CARROT_COUNT;
  addItem("carrot", CARROT_COUNT, "./img/carrot.png");
  addItem("bug", BUG_COUNT, "./img/bug.png");
}

function onFieldClick(e) {
  if (!started) {
    return; //게임이 시작되지 않았으면 함수를 종료
  }
  const target = e.target;
  if (target.matches(".carrot")) {
    target.remove();
    score++;
    updateScore();
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (target.matches(".bug")) {
    stopTimer();
    finishGame(false);
  }
}

function updateScore() {
  gameScore.innerHTML = CARROT_COUNT - score;
}

function addItem(className, count, src) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.height - CARROT_SIZE;
  for (let i = 0; i < count; i++) {
    const item = document.createElement("img");
    item.setAttribute("class", className);
    item.setAttribute("src", src);
    item.style.position = "absolute";
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
