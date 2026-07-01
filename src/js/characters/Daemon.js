import Character from '../Character.js';

export default class Daemon extends Character {
  constructor(level) {
    super(level);
    this.type = 'daemon';
    this.attack = 10;
    this.defence = 10;
  }

  getMoveRange() {
    return 1;
  }

  getAttackRange() {
    return 4;
  }
}
