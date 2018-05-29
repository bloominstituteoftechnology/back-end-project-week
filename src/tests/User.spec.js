const User = require('../models/User')
const mongoose = require('mongoose')
const { userName, password } = require('faker').internet
const { mongoUri, mongoOptions } = require('../server/config')

describe('User', () => {
  let userData
  
  beforeAll(() => {
    return mongoose.connect(mongoUri, mongoOptions)
  })
  
  afterAll(() => {
    return User.remove()
    .then(() => mongoose.disconnect())
  })
  
  beforeEach(() => {
    userData = {
      username: userName(),
      password: password()
    }
  })

  it('Hashes the password before saving', async () => {
    user = await User.create(userData)
    expect(user.password).not.toBe(userData.password)
  })

  it('Validates a provided password', async () => {
    return User.create(userData)
      .then(async () => {
        user = await User.login(userData)
        expect(user.username).toBe(userData.username)
      })
  })

  it('Rejects an incorrect password', async () => {
    return User.create(userData)
      .then(async () => {
        user = await User.login({ username: userData.username, password: '' })
        expect(user).toBeNull()
      })
  })
})