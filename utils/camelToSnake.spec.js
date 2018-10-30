const camelToSnake = require('./camelToSnake');

test('camelToSnake', () => {
  const testCase = {
    'camelToSnake': 1,
    'anotherOne': 2,
    'normal': 3,
  };

  const expected = {
    'camel_to_snake': 1,
    'another_one': 2,
    'normal': 3,
  };

  expect(camelToSnake(testCase)).toEqual(expected);
});