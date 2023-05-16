import { sum, multiply } from './mathUtils';

describe('Math Utils', () => {
  test('sum adds two numbers correctly', () => {
    expect(sum(2, 3)).toBe(5);
    expect(sum(-5, 10)).toBe(5);
    expect(sum(0, 0)).toBe(0);
  });

  test('multiply multiplies two numbers correctly', () => {
    expect(multiply(2, 3)).toBe(6);
    expect(multiply(-5, 10)).toBe(-50);
    expect(multiply(5, 0)).toBe(0);
  });
});