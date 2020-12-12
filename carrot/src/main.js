"use strict";

import PopUp from "./popup.js";
import { GameBuilder, Reason } from "./game.js";
import Field from "./field.js";

const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  game.start();
});

const game = new GameBuilder()
  .withGameDuration(5)
  .withCarrotCount(5)
  .withBugCount(5)
  .build();

game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case Reason.cancel:
      message = "Replay?";
      break;
    case Reason.win:
      message = "YOU WON!";
      break;
    case Reason.lose:
      message = "YOU LOST";
      break;
    default:
      throw new Error("not valid reason");
  }
  gameFinishBanner.show(message);
});
