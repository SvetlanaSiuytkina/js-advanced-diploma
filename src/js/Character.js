/**
 * Базовый класс, от которого наследуются классы персонажей
 * @property level - уровень персонажа, от 1 до 4
 * @property attack - показатель атаки
 * @property defence - показатель защиты
 * @property health - здоровье персонажа
 * @property type - строка с одним из допустимых значений:
 * swordsman
 * bowman
 * magician
 * daemon
 * undead
 * vampire
 */
export default class Character {
  constructor(level) {
    if (new.target === Character) {
      throw new Error('Нельзя создать экземпляр класса Character');    //
    }

    this.level = level;
    this.attack = 0;
    this.defence = 0;
    this.health = 50;
    this.type = '';
  }

  getMoveRange() {
    return 1;
  }

  getAttackRange() {
    return 4;
  }

  levelUp() {
    this.level += 1;
    this.health = Math.min(100, this.level + 80);

    const attackAfter = Math.max(this.attack, Math.floor(this.attack * (80 + this.health) / 100));
    const defenceAfter = Math.max(this.defence, Math.floor(this.defence * (80 + this.health) / 100));

    this.attack = attackAfter;
    this.defence = defenceAfter;
  }
}
