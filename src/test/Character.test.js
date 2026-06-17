import Character from '../js/Character.js';
import Bowman from '../js/characters/Bowman.js';

test('should return an error when creating a class object Character', () => {
  expect(() => new Character(1)).toThrow('Нельзя создать экземпляр класса Character');
});

test('should allow you to create instances of inherited classes', () => {
  const bowman = new Bowman(1);
  expect(bowman).toBeInstanceOf(Bowman);
  expect(bowman.id).toBe(1);
});
