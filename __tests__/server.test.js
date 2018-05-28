import mongoose from 'mongoose'
import request from 'supertest'
import faker from 'faker'
import server from '../server'

const date = faker.date
const { words } = faker.random

describe('server', () => {
  beforeAll(async () => {
    // create fake notes
    const notes = []
    for (let i = 0; i < 5; i++) {
      notes.push({
        title: words(Math.random() * (5 - 1) + 1),
        content: words(Math.random() * (23 - 11) + 11),
        dateCreated: date.past()
      })
    }

    const connection = await mongoose.connect('mongodb://localhost/lnotes-test')
    // add notes
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })

  it('runs a test', () => {
    expect(server).toBeTruthy()
  })
})
