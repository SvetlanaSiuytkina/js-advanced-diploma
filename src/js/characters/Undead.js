import Character from '../Character.js';

export default class Undead extends Character {
  constructor(level) {
    super(level);
    this.type = 'undead';
    this.attack = 40;
    this.defence = 10;
  }

  getMoveRange() {
    return 4;
  }

  getAttackRange() {
    return 1;
  }
}
