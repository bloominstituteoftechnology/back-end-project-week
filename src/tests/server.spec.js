const mongoose = require('mongoose')
const server = require('../server/server')
const request = require('supertest')(server)
const User = require('../models/User')
const { userName, password } = require('faker').internet
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
})