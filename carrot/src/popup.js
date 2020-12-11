"use stict";

export default class PopUp {
  constructor() {
    this.popUp = document.querySelector(".pop-up");
    this.popUpMessage = document.querySelector(".pop-up__ending");
    this.popUpBtn = document.querySelector(".pop-up__replay");
    this.popUpBtn.addEventListener("click", () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  show(text) {
    this.popUp.classList.remove("pop-up--hide");
    this.popUpMessage.innerHTML = text;
  }

  hide() {
    this.popUp.classList.add("pop-up--hide");
  }
}
