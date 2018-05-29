const User = require('../models/User')
const mongoose = require('mongoose')
const { mongoUri, mongoOptions } = require('../server/config')

describe('User', () => {
  beforeAll(() => {
    return mongoose.connect(mongoUri, mongoOptions)
  })
  
  afterAll(() => {
    return mongoose.disconnect()
  })

  it('Hashes the password before saving', async () => {
    const userData = {
      username: 'Jared',
      password: '13111'
    }
    
    return User.create(userData)
      .then(user => {
        expect(user.password).not.toBe(userData.password)
      })
  })
})