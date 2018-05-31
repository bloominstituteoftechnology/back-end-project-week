const mongoose = require('mongoose')
const faker = require('faker')
const User = require('../models/user')

describe('users', () => {
  let user
  const fakeuser = {
    username: faker.random.words(4),
    password: faker.random.words(11)
  }
  beforeAll(async () => {
    return await mongoose.connect('mongodb://localhost/lnotes-test')
  })

  afterEach(() => {
    User.remove()
  })

  afterAll(async () => {
    try {
      return await mongoose.disconnect()
    } catch (error) {
      console.error(error)
    }
  })

  it('can create a new user', async () => {
    user = new User(fakeuser)
    expect(user.username).toBe(fakeuser.username.toLowerCase())
  })

  it('will only create a new user if all required fields are used', async done => {
    user = new User({ username: fakeuser.username })
    try {
      await user.save()
    } catch (error) {
      expect(error).toBeTruthy()
      done()
    }
  })

  it('correctly checks password', async done => {
    user = new User(fakeuser)
    try {
      user.checkPassword('sd', (err, isMatch) => {
        if (err) done()
        expect(isMatch).toBe(false)
        done()
      })
    } catch (e) {
      console.error(e)
    }
  })
})
