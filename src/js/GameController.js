import themes from './themes.js';
import { levelThemeMap } from './themes.js';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
  }

  init() {
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService

    this.gamePlay.cellClickListeners(this.onCellClick);
    this.gamePlay.cellClickListeners(this.onCellEnter);
    this.gamePlay.cellClickListeners(this.onCellLeave);

    
    this.gamePlay.drawUi(themes.prairie);
  }

  onCellClick(index) {
    // TODO: react to click

    console.log(`Выбрана ячейка ${index}`);
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
  }
}
