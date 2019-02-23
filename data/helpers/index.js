const knex    = require('../dbConfig.js');
const bcrypt  = require('bcryptjs');
const shortid = require('shortid');
const saltNum = 10;

module.exports = {
  createUser: function(username, password, done) {

    const id = shortid.generate();
    const hash = bcrypt.hashSync(password, saltNum);

    knex('users').insert({ id, username, password: hash, })
      .then(rows => {
        done(null, { rows, id, username, password, hash });
      }).catch(err => {
        done(err);
      });

  }
}
