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
    const connection = await mongoose.connect('mongodb://localhost/lnotes-test')
  })

  afterEach(() => {
    User.remove()
  })

  afterAll(async () => {
    try {
      await mongoose.disconnect()
    } catch (error) {
      console.error(error)
    }
  })

  xit('can create a new user', async () => {
    user = new User(fakeuser)
    expect(user.username).toBe(fakeuser.username.toLowerCase())
  })

  xit('will only create a new user if all required fields are used', async done => {
    user = new User({ username: fakeuser.username })
    try {
      await user.save()
    } catch (error) {
      expect(error).toBeTruthy()
      done()
    }
  })

  xit('correctly checks password', async done => {
    user = new User(fakeUser)
    try {
      user.checkPassword('sd', (err, isMatch) => {
        if (err) done()
        console.log(isMatch)
        expect(isMatch).toBe(false)
        done()
      })
    } catch (e) {
      console.error(e)
    }
  })
})
