import Field from "./field.js";

export default class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.gameTimer = document.querySelector(".game__time");
    this.gameScore = document.querySelector(".game__score");
    this.palyBtn = document.querySelector(".game__play");

    this.palyBtn.addEventListener("click", () => {
      if (this.started) {
        this.stop();
      } else {
        this.start();
      }
    });

    this.gameField = new Field(this.carrotCount, this.bugCount);
    this.gameField.setClickListener(this.onItemClick);

    //게임의 상태를 기억할 변수 선언해놓기
    this.started = false;
    this.score = 0;
    this.timer = undefined;
  }

  //팝업: 게임이 멈춘 이유 설명
  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  //게임 시작
  start() {
    this.started = true;
    this.score = 0;
    this.init();
    this.btnPause();
    this.showTimerAndScore();
    this.startTimer();
  }

  //게임 중지
  stop() {
    this.started = false;
    this.stopTimer();
    this.pauseHide();
    this.onGameStop && this.onGameStop("cancel");
  }

  //게임 종료
  finish(win) {
    this.started = false;
    this.pauseHide();
    this.stopTimer();
    this.onGameStop && this.onGameStop(win ? "win" : "lose");
  }

  onItemClick = (item) => {
    if (!this.started) {
      return;
    }
    if (item === "carrot") {
      this.score++;
      this.updateScore();
      if (this.score === this.carrotCount) {
        this.finish(true);
      }
    } else if (item === "bug") {
      this.finish(false);
    }
  };

  init() {
    this.score = 0;
    this.gameScore.innerHTML = this.carrotCount;
    this.gameField.init();
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  //타이머 작동
  startTimer() {
    let remainingTimeSec = this.gameDuration;
    this.updateTimer(remainingTimeSec);
    this.timer = setInterval(() => {
      this.updateTimer(--remainingTimeSec);
      if (remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.finish(this.carrotCount === this.score);
        return;
      }
    }, 1000);
  }

  updateTimer(time) {
    const seconds = time % 60;
    this.gameTimer.innerHTML = `00:0${seconds}`;
  }

  showTimerAndScore() {
    this.gameTimer.style.visibility = "visible";
    this.gameScore.style.visibility = "visible";
  }

  pauseHide() {
    this.palyBtn.style.visibility = "hidden";
  }

  btnPause() {
    const icon = document.querySelector(".fas");
    icon.classList.remove("fa-play");
    icon.classList.add("fa-pause");
    this.palyBtn.style.visibility = "visible";
  }

  updateScore() {
    this.gameScore.innerHTML = this.carrotCount - this.score;
  }
}
