const User = require('../models/User')
const mongoose = require('mongoose')
const { userName, password } = require('faker').internet
const { mongoTestUri, mongoOptions } = require('../server/config')

describe('User', () => {
  let user, userData
  
  beforeAll(() => mongoose.connect(mongoTestUri, mongoOptions))
  
  afterEach(() => User.remove())
  afterAll(() => mongoose.disconnect())
  
  beforeEach(async () => {
    userData = {
      username: userName(),
      password: password()
    }
    user = await User.create(userData)
  })

  it('Hashes the password before saving', async () => {
    expect(user.password).not.toBe(userData.password)
  })

  it('Validates a provided password', async () => {
    const authenticated = await User.login(userData)
    expect(authenticated.username).toBe(user.username)
  })

  it('Rejects an incorrect password', async () => {
    let error
    try {
      const authenticated = await User.login({ username: user.username, password: '' })
    } catch (e) {
      error = e
    } finally {
      expect(error).toBeDefined()
    }
  })
})