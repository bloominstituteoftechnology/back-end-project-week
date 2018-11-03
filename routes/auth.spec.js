/* eslint-disable prefer-destructuring */
const request = require('supertest');
const faker = require('faker');
const bcrypt = require('bcrypt');
const db = require('knex')(require('../knexfile').development);
const server = require('../server');

const getUsers = () => db('users').select();
const populateUser = () => {
  const user = {
    username: faker.internet.userName(),
    password: faker.internet.password(),
  };

  return db('users')
    .insert({ ...user, password: bcrypt.hashSync(user.password, 6) })
    .returning('*')
    .then(([response]) => ({ ...response, password: user.password }));
};

describe('routes: auth', () => {
  let user;
  beforeEach((done) => {
    return db.migrate
      .rollback()
      .then(() => db.migrate.latest())
      .then(() => populateUser())
      .then((createdUser) => {
        user = createdUser;
        return done();
      })
      .catch((err) => {
        console.log(err);
        return done();
      });
  });

  describe('POST /auth/register', () => {
    test('registers a new user', (done) => {
      request(server)
        .post('/auth/register')
        .send({
          username: 'John',
          password: 'I fly an airplane fast.',
        })
        .then(async (res) => {
          expect(res.status).toBe(200);
          const users = await getUsers();
          expect(users).toHaveLength(2);
          expect(users[1].id).toBe(res.body.id);
          return done();
        });
    });
  });

  describe('POST /auth/login', () => {
    test('logins a user with correct password', (done) => {
      return request(server)
        .post('/auth/login')
        .send({
          username: user.username,
          password: user.password,
        })
        .then((response) => {
          expect(response.status).toBe(200);
          expect(response.body).toEqual({ message: 'Login successful' });
          return done();
        });
    });

    test('422 on bad password, ()', (done) => {
      return request(server)
        .post('/auth/login')
        .send({
          username: user.username,
          password: `${user.password}WRONG`,
        })
        .then((response) => {
          expect(response.status).toBe(422);
          expect(response.body).toEqual({ message: 'Login unsuccessful' });
          return done();
        });
    });

    test('422 on non-existing user', (done) => {
      return request(server)
        .post('/auth/login')
        .send({
          username: `${user.username}NOTEXISTING`,
          password: user.password,
        })
        .then((response) => {
          expect(response.status).toBe(422);
          expect(response.body).toEqual({ message: 'Login unsuccessful' });
          return done();
        });
    });

    describe('POST /auth/logout', () => {
      test('Successfully logs out a logged in user', (done) => {
        const agent = request.agent(server);

        return agent
          .post('/auth/login')
          .send({
            username: user.username,
            password: user.password,
          })
          .then((response) => {
            return agent
              .post('/auth/logout');
          })
          .then((response) => {
            expect(response.status).toBe(204);
            return agent
              .post('/auth/logout');
          })
          .then((response) => {
            expect(response.status).toBe(401);
            expect(response.body).toEqual({ message: 'Forbidden: User not authenticated' });
            return done();
          });
      });
    });
  });
});
