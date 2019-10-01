
const sum = function sum(a, b) {
  return a + b;
}

const resta = function resta(a, b) {
  return a - b;
}

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('resta 1 - 2 to equal -1', () => {
  expect(resta(1, 2)).toBe(-1);
});