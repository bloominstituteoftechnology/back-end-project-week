const { cleanUser } = require('./_helpers');

describe('cleanUser', () => {
  test('returns a user without password or admin property', () => {
    const user = {
      admin: false,
      created_at: String(Date.now()),
      id: 1,
      password: 'blahblah',
      username: 'Helloman',
    };

    const result = cleanUser(user);
    const expected = { ...user };
    delete expected.admin;
    delete expected.password;
    expect(result).toEqual(expected);
  });
});
