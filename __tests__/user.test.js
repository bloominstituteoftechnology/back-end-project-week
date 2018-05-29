import mongoose from 'mongoose'
import faker from 'faker'
import user, { verifyPassword } from '../models/user'

describe('users', () => {
  beforeAll(async () => {
    const connection = await mongoose.connect('mongodb://localhost/lnotes-test')
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })

  it('can create a new user', async () => {
    const fakeuser = {
      username: faker.random.words(4),
      password: faker.random.words(11)
    }
    const n = new user(fakeuser)
    expect(n.username).toBe(fakeuser.username.toLowerCase())
  })

  it('will only create a new user if all required fields are used', async () => {
    const fakeuser = {
      username: faker.random.word()
    }
    const n = new user(fakeuser)
    try {
      await n.save()
    } catch (error) {
      expect(error).toBeTruthy()
    }
  })

  it('correctly checks password', async () => {
    const fakeUser = {
      username: faker.random.word(),
      password: faker.random.words(4)
    }
    const n = new user(fakeUser)
    try {
      await n.save()
      n.checkPassword('sd', (err, isMatch) => {
        if (err) console.error(err)
        expect(isMatch).toBe(false)
      })
    } catch (e) {
      console.error(e)
    }
  })
})
