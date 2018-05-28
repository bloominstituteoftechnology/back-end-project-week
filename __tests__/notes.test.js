import mongoose from 'mongoose'
import faker from 'faker'
import note from '../models/note'

describe('notes', () => {
  beforeAll(async () => {
    const connection = await mongoose.connect('mongodb://localhost/lnotes-test')
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })

  it('can create a new note', async () => {
    const fakeNote = {
      title: faker.random.words(4),
      content: faker.random.words(11)
    }
    const n = new note(fakeNote)
    expect(n.title).toBe(fakeNote.title)
  })
})
