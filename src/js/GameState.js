export default class GameState {
  constructor() {
    this.currentLevel = 1;
    this.currentPlayer = 'player';
    this.selectedCharacter = null;
    this.positionedCharacters = [];
    this.currentScore = 0;
    this.maxScore = 0;
  }

  static from(object) {
    // TODO: create object
    const state = new GameState();
    Object.assign(state, object);
    
    return state;
  }
}
