const play = document.querySelector(".play");
let i = 10;

//플레이버튼 누르면 각 함수들 실행
play.addEventListener("click", (e) => {
  if (e.target.className === "fas fa-play") {
    e.target.className = "fas fa-pause";
    if (i == 10) {
      setTimeout(timeOver, 10000);
      let timeId = setInterval(timeCount, 1000);
    } else if (i == 0) {
      clearTimeout(timeId);
      return;
    }
  } else if (e.target.className === "fas fa-pause") {
    e.target.className = "fas fa-play";
  }
});

function timeCount() {
  i -= 1;
  if (i < 0) {
    i = 0;
    console.log("game over");
  } else {
    console.log(i);
  }
}

function timeOver() {
  console.log("time over...");
}

//엔딩 멘트 창
function end() {
  const endingMent = document.querySelector(".footer");
  endingMent.style.display = "block";
  endingMent.style.opacity = "0.6";
  //성공 or 실패 멘트
}

//게임 맵 펼쳐짐
function mission() {
  const main = document.querySelector(".main");
  const bug = new Image();
  bug.src = "./img/bug.png";
  main.appendChild(bug);

  const carrot = new Image();
  carrot.src = "./img/carrot.png";
  main.appendChild(carrot);
}
mission();
