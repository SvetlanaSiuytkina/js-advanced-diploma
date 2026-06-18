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
  

  createCharacterTooltip(character) {
    return `U+1F396${character.level} U+2694${character.attack} U+1F6E1${character.defence}  U+2764${character.health}`;
  }

  onCellClick(index) {
    // TODO: react to click
    const character = this.positionedCharacters.find(positChar => positChar.position === index);
    if (!character) {
      this.gamePlay.showError('Ячейка пуста');
      return;
    }
    const playerCharacter = character.character;

    if (!['bowman', 'swordsman', 'magician'].includes(playerCharacter.type)) {
      this.gamePlay.showError('Нельзя выбрать этого персонажа');
      return;
    }
  }
  
  onCellEnter(index) {
    // TODO: react to mouse enter
    const positionedCharacter = this.positionedCharacters.find(positChar => positChar.position === index);
    
    if (positionedCharacter) {
      const tooltip = this.createCharacterTooltip(positionedCharacter.character);
      this.gamePlay.showCellTooltip(tooltip, index);
    }
  }
  
  onCellLeave(index) {
    // TODO: react to mouse leave
    this.gamePlay.hideCellTooltip(index);
  }
}
