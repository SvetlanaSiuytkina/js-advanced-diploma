import themes from './themes.js';
import Bowman from './characters/Bowman.js';
import Daemon from './characters/Daemon.js';
import Magician from './characters/Magician.js';
import Swordsman from './characters/Swordsman.js';
import Undead from './characters/Undead.js';
import Vampire from './characters/Vampire.js';
import { generateTeam } from './generators.js';
import PositionedCharacter from './PositionedCharacter.js';
import cursors from './cursors.js';


export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.positionedCharacters = [];
    this.selectedCharacter = null;          
    this.currentPlayer = 'player';    // 'opponent'    
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

    //расставили игроков
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
    return `🎖${character.level} ⚔${character.attack} 🛡${character.defence} ❤${character.health}`;
  }

  async onCellClick(index) {
    // TODO: react to click
    if (this.currentPlayer !== 'player') return;

    const positionedCharacter = this.positionedCharacters.find(positChar => positChar.position === index);
    
    if (!positionedCharacter) {
      this.gamePlay.showError('Ячейка пуста');
      return;
    }

    const playerCharacter = ['bowman', 'swordsman', 'magician'].includes(positionedCharacter.character.type);
    
    if (!playerCharacter) {
      this.gamePlay.showError('Нельзя выбрать этого персонажа');
      return;
    }

    if (this.selectedCharacter) {
      this.gamePlay.deselectCell(this.selectedCharacter.position);
    }

    this.selectedCharacter = positionedCharacter;
    this.gamePlay.selectCell(index);

    //логика перемещ
    if (this.selectedCharacter && this.canMoveTo(index, this.selectedCharacter)) {
      const isCellOccupied = this.positionedCharacters.some(positChar => positChar.position === index);

      if (!isCellOccupied) {
        this.selectedCharacter.position = index;
        this.gamePlay.redrawPositions(this.positionedCharacters);
        this.gamePlay.deselectCell(this.selectedCharacter.position);
        this.selectedCharacter = null;
        this.switchTurn();
      }
    }

    //логика атаки
    if (this.selectedCharacter && this.canAttack(index, this.selectedCharacter)) {
      const targetCharacter = this.positionedCharacters.find(positChar => positChar.position === index);
      
      if (targetCharacter) {
        const damage = Math.max(this.selectedCharacter.character.attack - targetCharacter.character.defence, this.selectedCharacter.character.attack * 0.1);
        await this.gamePlay.showDamage(index, damage);
        targetCharacter.character.health -= damage;

        //убираем мертвого
        if (targetCharacter.character.health <= 0) {
          const index = this.positionedCharacters.indexOf(targetCharacter);
          this.positionedCharacters.splice(index, 1);
        }

        this.gamePlay.redrawPositions(this.positionedCharacters);
        this.gamePlay.deselectCell(this.selectedCharacter.position);
        this.selectedCharacter = null;
        this.switchTurn();
      }
    }
  }

  switchTurn() {
    this.currentPlayer = this.currentPlayer === 'player' ? 'opponent' : 'player';
    
    if (this.currentPlayer === 'opponent') {
      this.computerTurn();
    }
  }

  computerTurn() {

  }
  
  onCellEnter(index) {
    // TODO: react to mouse enter
    if (this.selectedCharacter) {
      const canMove = this.canMove(index, this.selectedCharacter);
      const canAttack = this.canAttack(index, this.selectedCharacter);

      if (canMove && !canAttack) {
        this.gamePlay.setCursor('pointer');
        this.gamePlay.selectCell(index, 'green');
      } else if (canAttack) {
        this.gamePlay.setCursor(cursors.crosshair);
        this.gamePlay.selectCell(index, 'red');
      } else {
        this.gamePlay.setCursor(cursors.notallowed);
        this.gamePlay.deselectCell(index);
      }
    }

    const positionedCharacter = this.positionedCharacters.find(positChar => positChar.position === index);
    
    if (positionedCharacter) {
      const tooltip = this.createCharacterTooltip(positionedCharacter.character);
      this.gamePlay.showCellTooltip(tooltip, index);
    }
  }
  
  onCellLeave(index) {
    // TODO: react to mouse leave
    this.gamePlay.hideCellTooltip(index);
    this.gamePlay.deselectCell(index);
  }
  
  //перемещается в целев яч
  canMoveTo(targetIndexCell, selectedCharacter) {
    const range = this.getMovementRange(selectedCharacter.character.type);
    return this.isInRange(selectedCharacter.position, targetIndexCell, range);
  }

  //атака цели на целев яч
  canAttack(targetIndexCell, selectedCharacter) {
    const range = this.getAttackRange(selectedCharacter.character.type);
    const targetCharacter = this.positionedCharacters.find(positChar => positChar.position === targetIndexCell);
    
    if (!targetCharacter || this.isAlly(targetCharacter.character.type)) {
      return false;
    }

    return this.isInRange(selectedCharacter.position, targetIndexCell, range);
  }
  
  // занята ли яч
  isCellOccupied(index) {
    return this.positionedCharacters.some((positChar) => positChar.position === index);
  }

  // дальность перемещения
  getMovementRange(characterType) {
    const movementRanges = {
      'swordsman': 4,
      'undead': 4,
      'bowman': 2,
      'vampire': 2,
      'magician': 1,
      'daemon': 1
    };

    return movementRanges[characterType];
  }

  //радиус атаки
  getAttackRange(type) {
    const ranges = {
      'swordsman': 1,
      'undead': 1,
      'bowman': 2,
      'vampire': 2,
      'magician': 4,
      'daemon': 4
    };

    return ranges[type];
  }

  //ячейка в заданном расстоянии
  isInRange(indexSourceCell, indexTargetCell, range) {
    const XindexSourceCell = indexSourceCell % 8;
    const YindexSourceCell = Math.floor(indexSourceCell / 8);

    const XindexTargetCell = indexTargetCell % 8;
    const YindexTargetCell = Math.floor(indexTargetCell / 8);

    const distanceX = Math.abs(XindexSourceCell - XindexTargetCell);       //  abs = |+-x|=x
    const distanceY = Math.abs(YindexSourceCell - YindexTargetCell);

    if (distanceX <= range && distanceY <= range) {
      return true;
    } else {
      return false;
    }
  }
  
  //является ли персонаж союзником
  isAlly(type) {
    return ['bowman', 'swordsman', 'magician'].includes(type);
  }
}
