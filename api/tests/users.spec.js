const mongoose = require('mongoose')
const request = require('supertest')
const server = require('../../server')
const User = require('../models/users.schema')

describe('Users', () => {

  const newUser = { username: 'peanut', password: 'hashme' }

  beforeAll(() => mongoose.connect('mongodb://localhost/test').then(() => console.log('\n=== connected to TEST DB ===')))

  afterAll(() => mongoose.disconnect().then(() => console.log('\n=== disconnected from TEST DB ===')))

  afterEach(() => User.remove())

  it('runs the a test', () => {});

  describe('GET', () => {
    it('should fetch all users from database', async () => {
      const savedUser = await User.create(newUser)
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
      const savedUser = await User.create(newUser)
      await 
      request(server)
        .get(`/api/users/${savedUser._id}`)
        .then(res => {
          expect(res.status).toBe(200)
          expect(res.body.username).toEqual(newUser.username)
          expect(res.body.password).not.toEqual(newUser.password)
        })
    })

    it('should return an error if an invalid ID is provided', async () => {
      const savedUser = await User.create(newUser)
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
      await 
      request(server)
        .post('/api/users')
        .send(newUser)
        .then(res => {
          expect(res.status).toBe(201)
          expect(res.type).toBe('application/json')
          expect(res.body.username).toBe('peanut')
          expect(res.body.password).not.toBe('hashme')
        })
    })

    it('should throw an error when a new game POST does not meet all requirements', async () => {
      const noUsername = { password: 'hashme' }
      const noPassword = { username: 'cashew' }
      await request(server).post('/api/users').send(noUsername).then(res => expect(res.status).toBe(500))
      await request(server).post('/api/users').send(noPassword).then(res => expect(res.status).toBe(500))
    })

  })
  
})