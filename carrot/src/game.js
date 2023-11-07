import { Field, ItemType } from "./field.js";

export const Reason = Object.freeze({
  win: "win",
  lose: "lose",
  cancel: "cancel",
});

export class GameBuilder {
  withGameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }

  withCarrotCount(num) {
    this.carrotCount = num;
    return this;
  }

  withBugCount(num) {
    this.bugCount = num;
    return this;
  }

  build() {
    return new Game(
      this.gameDuration, //
      this.carrotCount,
      this.bugCount
    );
  }
}

class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.gameTimer = document.querySelector(".game__time");
    this.gameScore = document.querySelector(".game__score");
    this.playBtn = document.querySelector(".game__play");

    this.playBtn.addEventListener("click", () => {
      if (this.started) {
        this.stop(Reason.cancel);
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

  //게임 중지 & 종료 어쨌든 게임 중단
  stop(reason) {
    this.started = false;
    this.stopTimer();
    this.pauseHide();
    this.onGameStop && this.onGameStop(reason);
  }

  onItemClick = (item) => {
    if (!this.started) {
      return;
    }
    if (item === ItemType.carrot) {
      this.score++;
      this.updateScore();
      if (this.score === this.carrotCount) {
        this.stop(Reason.win);
      }
    } else if (item === ItemType.bug) {
      this.stop(Reason.lose);
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
        this.stop(this.carrotCount === this.score ? Reason.win : Reason.lose);
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
    this.playBtn.style.visibility = "hidden";
  }

  btnPause() {
    const icon = document.querySelector(".fas");
    icon.classList.remove("fa-play");
    icon.classList.add("fa-pause");
    this.playBtn.style.visibility = "visible";
  }

  updateScore() {
    this.gameScore.innerHTML = this.carrotCount - this.score;
  }
}
