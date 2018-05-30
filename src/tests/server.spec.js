const mongoose = require('mongoose')
const server = require('../server/server')
const request = require('supertest')(server)
const User = require('../models/User')
const { userName, password } = require('faker').internet
const { getSessionToken } = require('../server/util')
const { mongoUri, mongoOptions } = require('../server/config')

describe('API server', () => {
  beforeAll(() => {
    return mongoose.connect(mongoUri, mongoOptions)
  })

  afterAll(() => {
    return User.remove()
      .then(() => mongoose.disconnect())
  })

  it('says hello when greeted at the front door', async () => {
    const response = await request.get('/')
    expect(response.status).toBe(200)
    expect(response.body).toEqual({ message: 'hello' })
  })

  describe('Auth routes', () => {
    let userData = {
      username: userName(),
      password: password()
    }

    it('Provides a token when a new user is created', async () => {
      const response = await request.post('/api/user/register').send(userData)
      expect(response.status).toBe(201)
      expect(response.body.token).toBeDefined()
    })

    it('Provides a token when an existing user is logged in', async () => {
      const response = await request.post('/api/user/login').send(userData)
      expect(response.status).toBe(200)
      expect(response.body.token).toBeDefined()
    })
  })

  describe('Note routes', () => {
    let token
    beforeAll(() => {
      return User.create({ username: userName(), password: password() })
        .then(user => token = getSessionToken(user))
    })

    it('Allows access to requests with a valid token', async () => {
      const response = await request.get('/api/note/').set('token', token)
      expect(response.status).toBe(200)
    })

    it('Denies access to requests with a missing or invalid token', async () => {
      let missingResponse = await request.get('/api/note/')
      let invalidResponse = await request.get('/api/note/').set('token', 'invalid')
      expect(missingResponse.status).toBe(400)
      expect(invalidResponse.status).toBe(404)
    })
  })
})