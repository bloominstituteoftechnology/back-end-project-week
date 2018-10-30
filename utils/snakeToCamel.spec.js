
const snakeToCamel = require('./snakeToCamel');

test('snakeToCamel', () => {
  const expected = {
    'camelToSnake': 1,
    'anotherOne': 2,
    'normal': 3,
  };

  const testCase = {
    'camel_to_snake': 1,
    'another_one': 2,
    'normal': 3,
  };

  expect(snakeToCamel(testCase)).toEqual(expected);
});