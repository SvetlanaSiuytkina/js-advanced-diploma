import Bowman from '../js/characters/Bowman.js';
import Swordsman from '../js/characters/Swordsman.js';
import Magician from '../js/characters/Magician.js';
import Vampire from '../js/characters/Vampire.js';
import Undead from '../js/characters/Undead.js';
import Daemon from '../js/characters/Daemon.js';

test('Bowman level 1 should have correct stats', () => {
  const bowman = new Bowman(1);
  expect(bowman.level).toBe(1);
  expect(bowman.type).toBe('bowman');
  expect(bowman.attack).toBe(25);
  expect(bowman.defence).toBe(25);
});

test('Swordsman level 1 should have correct stats', () => {
  const swordsman = new Swordsman(1);
  expect(swordsman.level).toBe(1);
  expect(swordsman.type).toBe('swordsman');
  expect(swordsman.attack).toBe(40);
  expect(swordsman.defence).toBe(10);
});

test('Magician level 1 should have correct stats', () => {
  const magician = new Magician(1);
  expect(magician.level).toBe(1);
  expect(magician.type).toBe('magician');
  expect(magician.attack).toBe(10);
  expect(magician.defence).toBe(40);
});

test('Vampire level 1 should have correct stats', () => {
  const vampire = new Vampire(1);
  expect(vampire.level).toBe(1);
  expect(vampire.type).toBe('vampire');
  expect(vampire.attack).toBe(25);
  expect(vampire.defence).toBe(25);
});

test('Undead level 1 should have correct stats', () => {
  const undead = new Undead(1);
  expect(undead.level).toBe(1);
  expect(undead.type).toBe('undead');
  expect(undead.attack).toBe(40);
  expect(undead.defence).toBe(10);
});

test('Daemon level 1 should have correct stats', () => {
  const daemon = new Daemon(1);
  expect(daemon.level).toBe(1);
  expect(daemon.type).toBe('daemon');
  expect(daemon.attack).toBe(10);
  expect(daemon.defence).toBe(10);
});
