"use strict";

import PopUp from "./popup.js";
import Field from "./field.js";

const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const palyBtn = document.querySelector(".game__play");
const gameTimer = document.querySelector(".game__time");
const gameScore = document.querySelector(".game__score");

//게임의 상태를 기억할 변수 선언해놓기
let started = false;
let score = 0;
let timer = undefined;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(startGame);

const gameField = new Field(CARROT_COUNT, BUG_COUNT);
gameField.setClickListener(onItemClick);

function onItemClick(item) {
  if (!started) {
    return;
  }
  if (item === "carrot") {
    score++;
    updateScore();
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (item === "bug") {
    finishGame(false);
  }
}

function initGame() {
  score = 0;
  gameScore.innerHTML = CARROT_COUNT;
  gameField.init();
}

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
  stopTimer();
  gameFinishBanner.show(win ? "YOU WON!" : "YOU LOST");
}

//게임 중지
function stopGame() {
  started = false;
  stopTimer();
  pauseHide();
  gameFinishBanner.show("REPLAY?");
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

function showTimerAndScore() {
  gameTimer.style.visibility = "visible";
  gameScore.style.visibility = "visible";
}

function pauseHide() {
  palyBtn.style.visibility = "hidden";
}

function btnPause() {
  const icon = document.querySelector(".fas");
  icon.classList.remove("fa-play");
  icon.classList.add("fa-pause");
  palyBtn.style.visibility = "visible";
}

function updateScore() {
  gameScore.innerHTML = CARROT_COUNT - score;
}
