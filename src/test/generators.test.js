import {characterGenerator, generateTeam} from '../js/generators.js';
import Bowman from '../js/characters/Bowman.js';
import Shordsman from '../js/characters/Swordsman.js';
import Team from '../js/Team.js';

test('should generate an infinite number of new characters from the list', () => {
  const allowedTypes = [Bowman, Shordsman];
  const iterations = 10;
  const generator = characterGenerator(allowedTypes, 4);

  for (let i = 0; i < iterations; i++) {
    const result = generator.next();
    expect(result.done).toBe(false);

    const character = result.value;
    expect([Bowman, Shordsman]).toContain(character.constructor);      ///
  }
});

test('team is created with the required number of characters and levels', () => {
  const allowedTypes = [Bowman, Shordsman];
  const maxLevel = 4;
  const characterCount = 4;
  const team = generateTeam(allowedTypes, maxLevel, characterCount);
  
  expect(team).toBeInstanceOf(Team);
  expect(team.characters).toHaveLength(characterCount);

  team.characters.forEach(character => {
    expect([Bowman,Shordsman]).toContain(character.constructor);
    expect(character.level).toBeGreaterThanOrEqual(1);
    expect(character.level).toBeLessThanOrEqual(maxLevel);
  });
});
