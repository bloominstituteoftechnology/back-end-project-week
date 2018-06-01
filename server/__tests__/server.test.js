const mongoose = require('mongoose')
const request = require('supertest')
const faker = require('faker')
const server = require('../server')

const date = faker.date
const { words, word } = faker.random

describe('server', () => {
  it('runs a test', () => {
    expect(server).toBeTruthy()
  })

  it('creates a new note', async () => {
    const fakeNote = {
      title: faker.random.words(4),
      content: faker.random.words(15)
    }
    const res = await request(server)
      .post('/api/notes')
      .send(fakeNote)

    expect(res.status).toBe(201)
    expect(res.body).toMatchObject(
      expect.objectContaining({
        title: expect.any(String),
        content: expect.any(String),
        _id: expect.any(String)
      })
    )
  })

  it('gets all the notes', () => {
    request(server)
      .get('/api/notes')
      .then(res => {
        expect(res.status).toBe(200)
        expect(res.body.length).toBeGreaterThan(0)
      })
  })

  it('gets one note', () => {
    request(server)
      .get('/api/notes/5b116a6d7e3cfd102869a279')
      .then(res => {
        expect(res.status).toBe(200)
        expect(res.body).toBeTruthy()
      })
  })

  it('updates notes', () => {
    request(server)
      .put('api/notes/5b116a6d7e3cfd102869a279')
      .send({ title: 'different', content: 'very different' })
      .then(data => expect(data).toBeTruthy())
      .catch(e => console.error(e.message, e.stack))
  })

  it('deletes notes', () => {
    request(server)
      .delete('api/notes/5b116a6d7e3cfd102869a279')
      .then(res => expect(res.status).toBe(200))
      .catch(e => console.error(e))
  })
})
