const mongoose = require('mongoose')
const faker = require('faker')
const Note = require('../models/note')

describe('notes', () => {
  let note
  const fakeNote = {
    title: faker.random.words(4),
    content: faker.random.words(11)
  }
  beforeAll(async () => {
    const connection = await mongoose.connect('mongodb://localhost/lnotes-test')
  })
  afterEach(() => Note.remove())

  afterAll(async () => {
    try {
      await mongoose.disconnect()
    } catch (e) {
      console.error(e)
    }
  })

  it('can create a new note', async () => {
    note = new Note(fakeNote)
    expect(note.title).toBe(fakeNote.title)
  })

  it('will only create a new note if all required fields are used', async () => {
    note = new Note(fakeNote)
    try {
      await note.save()
    } catch (error) {
      expect(error).toBeTruthy()
    }
  })
})
