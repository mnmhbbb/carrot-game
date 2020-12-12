"use strict";

import PopUp from "./popup.js";
import Game from "./game.js";
import Field from "./field.js";

const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  game.start();
});

const game = new Game(5, 5, 5);
game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case "cancel":
      message = "Replay?";
      break;
    case "win":
      message = "YOU WON!";
      break;
    case "lose":
      message = "YOU LOST";
      break;
    default:
      throw new Error("not valid reason");
  }
  gameFinishBanner.show(message);
});
