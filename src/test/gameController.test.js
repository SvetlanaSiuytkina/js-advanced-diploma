import Bowman from '../js/characters/Bowman.js';
import Vampire from '../js/characters/Vampire.js';
import GameController from '../js/GameController.js';
import GamePlay from '../js/GamePlay.js';
import PositionedCharacter from '../js/PositionedCharacter.js';
import themes from '../js/themes.js';

describe('GameController character tooltip', () => {
  test('when you hover over a character, information about its characteristics is displayed', () => {
    const bowman = new Bowman(1);
    bowman.health = 50;

    const mockGamePlay = {
      addNewGameListener: jest.fn(),
      addCellClickListener: jest.fn(),
      addCellEnterListener: jest.fn(),
      addCellLeaveListener: jest.fn(),
      drawUi: jest.fn(),
      redrawPositions: jest.fn(),
      selectCell: jest.fn(),
      deselectCell: jest.fn(),
      showDamage: jest.fn().mockResolvedValue(undefined),
      setCursor: jest.fn(),
      showCellTooltip: jest.fn()
    };

    const mockStateService = {
      load: jest.fn(() => null),
      setItem: jest.fn(),
      getItem: jest.fn()
    };
    
    const controller = new GameController(mockGamePlay, mockStateService);
    const tooltip = controller.createCharacterTooltip(bowman);

    expect(tooltip).toBe('🎖1 ⚔25 🛡25 ❤50');
  });
});

describe('GameController: character selection', () => {
  let controller;
  let gamePlay;
  let stateService;

  beforeEach(() => {
    const container = document.createElement('div');
    container.id = 'game-container';
    document.body.appendChild(container);

    gamePlay = new GamePlay();
    gamePlay.bindToDOM(container);
    gamePlay.drawUi(themes.prairie);

    stateService = {
      load: jest.fn(() => null),
      setItem: jest.fn(),
      getItem: jest.fn(),
    };

    controller = new GameController(gamePlay, stateService);

    controller.positionedCharacters = [
      new PositionedCharacter(new Bowman(1), 0),
      new PositionedCharacter(new Vampire(1), 63)
    ];
  });
  
  afterEach(() => {
    const container = document.querySelector('#game-container');
    if (container) {
      container.remove();
    }
  });

  test('at the start of the game, the turn belongs to the player', () => {
    expect(controller.currentPlayer).toBe('player');
  });

  test('subscribes to cell clicks during initialization', () => {
    expect(typeof controller.onCellClick).toBe('function');
  });

  test('removes the selection from the previous character when selecting a new one', () => {
    controller.onCellClick(0);
    expect(controller.selectedCharacter.position).toBe(0);
    controller.selectedCharacter = null;

    const secondPlayer = new PositionedCharacter(new Bowman(1), 8);

    controller.positionedCharacters.push(secondPlayer);
    controller.gamePlay.redrawPositions(controller.positionedCharacters);

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
