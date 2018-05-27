const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

const User = require('../models/UserModel');

describe('Users', () => {
  describe('getUsername', () => {
    it('should return the username of the user', ()=> {
      const user = new User({
        username: "test",
        password: "password",
      });
      expect(user.getUsername()).to.equal('test');
    });
  });
});