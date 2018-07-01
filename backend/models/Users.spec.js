// Packages
const mongoose = require('mongoose');
// Dependencies
const Users = require('./Users');
const Notes = require('./Notes');
// Definitions
const { MONGO_TEST_URI } = require('../utils/secrets');

describe('User Model:', () => {

  beforeAll(async () => {
    try {
      await mongoose.connect(MONGO_TEST_URI);
    } catch(error) {
      console.log("\n=== MongoDB connection unsuccessful ===\n",error);
      return;
    }
    console.log('\n*** connected to TEST DB ***\n');
  });
  
  afterAll(async () => {
    await Notes.remove();
    await Users.remove();
    return mongoose
    .disconnect()
    .then(() => console.log('\n=== disconnected from TEST DB ==='))
    .catch(err => console.log('\nError:',err,'\n'));
  });
  
  it('The tests are testing.', () => {
    expect('sanity check').toBe('sanity check');
    expect(true).toBeTruthy();
  });

  describe('Validation:', () => {

    /* Test Data */
    const testUser = {
      'email': 'ron@ron.com',
      'password': '12345678',
    };

    it('rejects data if email is missing.', async () => {

      const { email, ...userWithNoEmail } = testUser;

      let response;
      try {
        response = await Users.create(userWithNoEmail);
      } catch(error) {
        response = error;
      }

      expect(response.message).toBe("User validation failed: email: Path `email` is required.");
    });

    it('rejects data if email is malformed.', async () => {

      const userWithBadEmail = { ...testUser, email: 'ron@ron' };

      let response;
      try {
        response = await Users.create(userWithBadEmail);
      } catch(error) {
        response = error;
      }

      expect(response.message).toBe("User validation failed: email: ron@ron is not a valid e-mail address!");
    });

    it('rejects data if email is not a string.', async () => {

      const userWithBadEmail = { ...testUser, email: 1 };

      let response;
      try {
        response = await Users.create(userWithBadEmail);
      } catch(error) {
        response = error;
      }

      expect(response.message).toBe("User validation failed: email: 1 is not a valid e-mail address!");
    });

    it('rejects data if password is missing.', async () => {

      const { password, ...userWithNoPassword } = testUser;

      let response;
      try {
        response = await Users.create(userWithNoPassword);
      } catch(error) {
        response = error;
      }

      expect(response.message).toBe("User validation failed: password: Path `password` is required.");
    });
  });

  describe('Password Management:', () => {

    /* Test Data */
    const testUser = {
      'email': 'ron@ron.com',
      'password': '12345678',
    };
    let createdUser; // defined in beforeAll()
    
    beforeAll(async () => {
      createdUser = await Users.create(testUser);
    });

    afterAll(async () => {
      await Users.remove();
    })

    it('saves the hashed password to the DB.', () => {
      const { password: savedHash } = createdUser;
      const plainPassword = testUser.password;
      const lengthOfEveryHashBcryptGenerates = 60;

      expect(savedHash).not.toBe(plainPassword);
      expect(savedHash.length).toBe(lengthOfEveryHashBcryptGenerates);
    });

    it('accepts correct input upon comparison with the saved hash.', async () => {
      const correctPlainPassword = testUser.password;

      const passwordValidationResult = await createdUser.validatePassword(correctPlainPassword);
      expect(passwordValidationResult).toBeTruthy();
    });

    it('rejects incorrect input upon comparison with the saved hash.', async () => {
      const incorrectPlainPassword = 'what is love';

      const passwordValidationResult = await createdUser.validatePassword(incorrectPlainPassword);
      expect(passwordValidationResult).toBeFalsy();
    });
  });

  describe('Default Values:', () => {

    /* Test Data */
    const testUser = {
      'email': 'ron@ron.com',
      'password': '12345678',
    };
    let createdUser; // defined in beforeAll()

    beforeAll(async () => {
      createdUser = await Users.create(testUser);
    });

    afterAll(async () => {
      await Users.remove();
    })

    it('result has a \'pref\' property with the nested default object {theme: \'default\'} even though input does not specify it', () => {
      expect(createdUser).toMatchObject({pref: { theme: 'default'}});
    });

    it('has a notes property with a value of an empty array', () => {
      expect(createdUser).toMatchObject({ notes: expect.arrayContaining([]) });
    });

  });

  describe('Queries:', () => {

    /* Global Test Data */
    const testUsers = [
      {
        '_id': '5b30103ce1b2f831b8b04010',
        'email': 'john@doe.com',
        'password': 'arewemarriedorarewesiblings',
        'notes': ['5b3010a706ae9531b8a9b421']
      },
      {
        '_id': '5b30101a8a63c231b8200da2',
        'email': 'jane@doe.com',
        'password': 'porquenolosdos',
        'notes': ['5b3010deec60a131b830e565']
      },
    ];

    const testNotes = [
      {
        '_id': '5b3010a706ae9531b8a9b421',
        'title': 'Hey',
        'text': 'You there! Hey! Over there!',
        'author': '5b30103ce1b2f831b8b04010'
      },
      {
        '_id': '5b3010deec60a131b830e565',
        'title': 'One look',
        'text': 'That\'s all it takes. Possibilities!',
        'author': '5b30101a8a63c231b8200da2'
      }
    ];

    beforeAll(async () => {
      await Users.create(testUsers);
      await Notes.create(testNotes);
    });

    afterAll(async() => {
      await Users.remove();
      await Notes.remove();
    });

    it('returns all users in DB upon find request.', async () => {
      const result = await Users.find().populate('notes');
      const expectedResult = [
        expect.objectContaining({ 'email': 'john@doe.com' }),
        expect.objectContaining({ 'email': 'jane@doe.com' }),
      ];

      expect(result.length).toBe(2);
      expect(result).toEqual(expect.arrayContaining(expectedResult));
    })
  });

});