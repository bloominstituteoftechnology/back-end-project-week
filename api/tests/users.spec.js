const mongoose = require('mongoose')
const request = require('supertest')
const server = require('../../server')
const User = require('../models/users.schema')

describe('Users', () => {

  let newUser;

  beforeAll(() => mongoose.connect('mongodb://localhost/test').then(() => console.log('\n=== connected to TEST DB ===')))

  beforeEach(async () => newUser = await User.create({ username: 'peanut', password: 'hashme' }))

  afterEach(() => User.remove())

  afterAll(() => mongoose.disconnect().then(() => console.log('\n=== disconnected from TEST DB ===')))

  it('runs the a test', () => {});

  describe('GET', () => {
    it('should fetch all users from database', async () => {
      const anotherUser = await User.create({ username: 'jeffrey', password: 'flynn' })
      await 
      request(server)
        .get('/api/users')
        .then(res => {
          expect(res.status).toBe(200)
          expect(res.type).toBe('application/json')
          expect(res.body).toHaveLength(2)
        })
    })

    it('should fetch a user with provided ID', async () => {
      await 
      request(server)
        .get(`/api/users/${newUser._id}`)
        .then(res => {
          expect(res.status).toBe(200)
          expect(res.body.username).toEqual(newUser.username)
          expect(res.body.password).toEqual(newUser.password)
        })
    })

    it('should return an error if an invalid ID is provided', async () => {
      await 
      request(server)
        .get('/api/users/12345')
        .then(res => {
          expect(res.status).toBe(500)
          expect(res.type).toBe('application/json')
        })
    })
  })

  describe('POST', () => {
    it('should create a new user', async () => {
      const freshUser = { username: 'jeffrey', password: 'flynn' }
      await 
      request(server)
        .post('/api/users')
        .send(freshUser)
        .then(res => {
          expect(res.status).toBe(201)
          expect(res.type).toBe('application/json')
          expect(res.body.username).toBe('jeffrey')
          expect(res.body.password).not.toBe('flynn')
        })
    })

    it('should throw an error when a new game POST does not meet all requirements', async () => {
      const noUsername = { password: 'hashme' }
      const noPassword = { username: 'cashew' }
      await request(server).post('/api/users').send(noUsername).then(res => expect(res.status).toBe(500))
      await request(server).post('/api/users').send(noPassword).then(res => expect(res.status).toBe(500))
    })
  })

  describe('PUT', () => {
    it('should update username an existing user', async () => {
      await
      request(server)
        .put(`/api/users/${newUser._id}`)
        .send({ username: 'jeffrey' })
        .then(res => {
          expect(res.status).toBe(200)
          expect(res.type).toBe('application/json')
          expect(res.body.username).toBe('jeffrey')
        })
    })

    it('mightttt update an existing user\'s password', async () => {
      await
      request(server)
        .put(`/api/users/${newUser._id}`)
        .send({ password: 'freshpasswordboi' })
        .then(res => {
          expect(res.status).toBe(200)
          expect(res.body.password).not.toBe('freshpasswordboi')
        })
    })
  })
  
})