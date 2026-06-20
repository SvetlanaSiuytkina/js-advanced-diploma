import Bowman from '../js/characters/Bowman.js';
import Vampire from '../js/characters/Vampire.js';
import GameController from '../js/GameController.js';
import GamePlay from '../js/GamePlay.js';
import PositionedCharacter from '../js/PositionedCharacter.js';

describe('GameController character tooltip', () => {
  test('when you hover over a character, information about its characteristics is displayed', () => {
    const bowman = new Bowman(1);
    bowman.health = 50;
    const controller = new GameController();
    const tooltip = controller.createCharacterTooltip(bowman);
    expect(tooltip).toBe('🎖1 ⚔25 🛡25 ❤50');
  });
});

describe('GameController: character selection', () => {
  let controller;
  let gamePlay;

  beforeEach(() => {
    gamePlay = new GamePlay();
    controller = new GameController(gamePlay, null);

    controller.positionedCharacters = [
      new PositionedCharacter(new Bowman(1), 0),
      new PositionedCharacter(new Vampire(1), 63)
    ];

    controller.init();
  });

  test('at the start of the game, the turn belongs to the player', () => {
    expect(controller.currentPlayer).toBe('player');
  });

  test('subscribes to cell clicks during initialization', () => {
    expect(gamePlay.addCellClickListener).toBeDefined();
  });

  test('removes the selection from the previous character when selecting a new one', () => {
    controller.onCellClick(0);
    const secondPlayer = new PositionedCharacter(new Bowman(1), 8);
    controller.positionedCharacters.push(secondPlayer);
    controller.onCellClick(8);
    expect(controller.selectedCharacter.position).toBe(8);
  });
  
  test('does not allow you to choose a character when the computer moves', () => {
    controller.currentPlayer = 'opponent';
    const originalSelection = controller.selectedCharacter;
    controller.onCellClick(0);
    expect(controller.selectedCharacter).toBe(originalSelection);
  });
});
