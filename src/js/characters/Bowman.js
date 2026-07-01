import Character from '../Character.js';

export default class Bowman extends Character {
  constructor(level) {
    super(level);
    this.type = 'bowman';
    this.attack = 25;
    this.defence = 25;
  }

  getMoveRange() {
    return 2;
  }

  getAttackRange() {
    return 2;
  }
}
