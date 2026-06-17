import { calcTileType } from '../js/utils.js';

test('returns the top-left angle correctly', () => {
  expect(calcTileType(0, 8)).toBe('top-left');
});

test('returns the top-right angle correctly', () => {
  expect(calcTileType(7, 8)).toBe('top-right');
});

test('returns the bottom-left angle correctly', () => {
  expect(calcTileType(56, 8)).toBe('bottom-left');
});

test('returns the bottom-right angle correctly', () => {
  expect(calcTileType(63, 8)).toBe('bottom-right');
});

test('returns the top edge correctly', () => {
  expect(calcTileType(1, 8)).toBe('top');
});

test('returns the bottom edge correctly', () => {
  expect(calcTileType(59, 8)).toBe('bottom');
});

test('returns the left edge correctly', () => {
  expect(calcTileType(7, 7)).toBe('left');
});

test('returns the right edge correctly', () => {
  expect(calcTileType(15, 8)).toBe('right');
});

test('returns the center correctly', () => {
  expect(calcTileType(42, 8)).toBe('center');
});
