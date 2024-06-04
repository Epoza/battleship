import analyzeArray from './main';

const analyze = analyzeArray([3, 8, 9, 2, 15]);

test('Analyze an array with numbers', () => {
  expect(analyze.average).toBeCloseTo(7.4);
  expect(analyze.min).toBe(2);
  expect(analyze.max).toBe(15);
  expect(analyze.length).toBe(5);
});
