const camelToSnake = require('./camelToSnake');

test('camelToSnake', () => {
  const testCase = {
    'camelToSnake': 1,
    'textBody': 'Body',
    'anotherOne': 2,
    'normal': 3,
  };

  const expected = {
    'camel_to_snake': 1,
    'text_body': 'Body',
    'another_one': 2,
    'normal': 3,
  };

  expect(camelToSnake(testCase)).toEqual(expected);
});