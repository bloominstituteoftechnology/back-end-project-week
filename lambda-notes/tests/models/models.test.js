const mongoose = require('mongoose');
const Band = require('./models');

const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

describe('Bands', () => {
  before(done => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/test');
    const db = mongoose.connection;
    db.on('error', () => console.error.bind(console, 'connection error'));
    db.once('open', () => {
      console.log('we are connected');
      done();
    });
  });

  after(done => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  });

  describe('get the right content size', () => {
    it('should give back the proper length', () => {
      expect(band.getContentSize()).to.equal(1);
    });
  });
});