import Character from '../Character.js';

export default class Magician extends Character {
  constructor(level) {
    super(level);
    this.type = 'magician';
    this.attack = 10;
    this.defence = 40;
  }

  getMoveRange() {
    return 1;
  }

  getAttackRange() {
    return 4;
  }
}
