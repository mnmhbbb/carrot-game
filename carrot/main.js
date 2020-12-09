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

//게임의 상태를 기억할 변수 선언해놓기
let started = false;
let score = 0;
let timer = undefined;

palyBtn.addEventListener("click", () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
  started = !started; //버튼을 누르면 상태가 바뀌니까
});

//게임 중지
function stopGame() {}

//게임 시작
function startGame() {
  initGame();
  iconPause();
  showTimerAndScore();
  startTimer();
}

function startTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  initTimer(remainingTimeSec);

  timer = setInterval(() => {
    initTimer(--remainingTimeSec);
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      return;
    }
  }, 1000);
}

function initTimer(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerHTML = `0${minutes}:0${seconds}`;
}

function showTimerAndScore() {
  gameTimer.style.visibility = "visible";
  gameScore.style.visibility = "visible";
}

function iconPause() {
  const icon = document.querySelector(".fa-play");
  icon.classList.remove("fa-play");
  icon.classList.add("fa-pause");
}

function initGame() {
  field.innerHTML = "";
  gameScore.innerHTML = CARROT_COUNT;
  addItem("carrot", CARROT_COUNT, "./img/carrot.png");
  addItem("bug", BUG_COUNT, "./img/bug.png");
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
