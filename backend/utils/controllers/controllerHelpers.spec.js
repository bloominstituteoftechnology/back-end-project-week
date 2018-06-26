const httpStatusCode = require('../HTTPStatusCodes');

const { 
  validateUserPostBody
} = require('./controllerHelpers');

describe('Controller Helpers Test:', () => {

  describe('validateUserPostBody', () => {
    /* Test Data */
    const testUser = {
      email: "ron@ron.com",
      password: "12345678"
    };

    it('returns error if email is missing.', () => {
      const { email, ...userWithNoEmail } = testUser;
    
      const expectedBody = { 
        errorState: true,
        status: httpStatusCode.badRequest,
        error: "400: Bad Request\nThe 'email' field is missing but is required."
      };

      const responseObject = validateUserPostBody(userWithNoEmail);

      expect(responseObject).toMatchObject(expectedBody);
    });

    it('returns error if password is missing.', () => {
      const { password, ...userWithNoPassword } = testUser;
    
      const expectedBody = { 
        errorState: true,
        status: httpStatusCode.badRequest,
        error: "400: Bad Request\nThe 'password' field is missing but is required."
      };

      const responseObject = validateUserPostBody(userWithNoPassword);

      expect(responseObject).toMatchObject(expectedBody);
    });

    it('returns error if password is not a minimum of 8 characters', () => {
      const badPasswordUser = {...testUser, password: '1234567' };
      const expectedBody = {
        errorState: true,
        status: httpStatusCode.unprocessableEntity,
        error: '422: Unprocessable Entity\nThe password supplied is invalid.\n\nPasswords should be a minimum of eight (8) characters.'
      };

      const responseObject = validateUserPostBody(badPasswordUser);
      expect(responseObject).toMatchObject(expectedBody);
    })
    it('returns proper input passed into it.', () => {
      const responseObject = validateUserPostBody(testUser);

      expect(responseObject).toMatchObject(testUser);
    });

    it('returns just the username and password when presented with extraneous information', () => {
      const bloatedUser = {...testUser, likes: "walks on the beach", insane: true };

      const responseObject = validateUserPostBody(bloatedUser);

      expect(responseObject).toMatchObject(testUser);
      expect(responseObject).not.toMatchObject(bloatedUser);
    })
  });
});