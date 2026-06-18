import themes from './themes.js';
import Bowman from './characters/Bowman.js';
import Daemon from './characters/Daemon.js';
import Magician from './characters/Magician.js';
import Swordsman from './characters/Swordsman.js';
import Undead from './characters/Undead.js';
import Vampire from './characters/Vampire.js';
import { generateTeam } from './generators.js';
import PositionedCharacter from './PositionedCharacter.js';


export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.positionedCharacters = [];
  }

  init() {
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService

    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));

    
    this.gamePlay.drawUi(themes.prairie);

    const playerTypes = [Bowman, Swordsman, Magician];
    const opponentTypes = [Vampire, Undead, Daemon];

    const playerTeam = generateTeam(playerTypes, 3, 4);
    const opponentTeam = generateTeam(opponentTypes, 3, 4);
    
    const playerPositions = [0, 1, 8, 9];
    const opponentPositions = [54, 55, 62, 63];

    playerTeam.characters.forEach((player, i) => {
      const positionedPlayer = new PositionedCharacter(player, playerPositions[i]);
      this.positionedCharacters.push(positionedPlayer);
    });

    opponentTeam.characters.forEach((player, i) => {
      const positionedPlayer = new PositionedCharacter(player, opponentPositions[i]);
      this.positionedCharacters.push(positionedPlayer);
    });

    this.gamePlay.redrawPositions(this.positionedCharacters);
  }

  onCellClick() {
    // TODO: react to click

  }

  onCellEnter(index) {
    // TODO: react to mouse enter
    const positionedCharacters = this.positionedCharacters;
    
  }

  onCellLeave() {
    // TODO: react to mouse leave
  }
}
