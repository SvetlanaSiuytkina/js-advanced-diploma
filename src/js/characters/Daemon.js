import Character from '../Character.js';

export default class Deamon extends Character {
    constructor(level) {
        super(level, 'daemon');
        this.attack = 10;
        this.defence = 10;
    }
}