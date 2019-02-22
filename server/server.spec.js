const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')

describe('testing the API Endpoints', () => {
  describe('GET /notes', () => {
    test('should return an array of objects', async () => {
    const response = await request(server).get('/notes')

    expect(response.body).toEqual([
      {
        "id": 1,
        "title": "Test one",
        "content": "This is the first test",
        "time_posted": "2019-02-13 04:45:16"
    },
    {
        "id": 2,
        "title": "Test Two",
        "content": "This is the second test",
        "time_posted": "2019-02-13 04:45:16"
    },
    {
        "id": 3,
        "title": "Test Three",
        "content": "This is the third test",
        "time_posted": "2019-02-13 04:45:16"
    }
      ])
    })

    test('should return an array with a length of 3', async () => {
      const response = await request(server).get('/notes')

      expect(response.body.length).toBe(3)
    })
  })

  describe('GET /note/:id', () => {
    test('should return a specific object', async () => {
      const response = await request(server).get('/note/1')

      expect(response.body).toEqual([
        {
          "id": 1,
          "title": "Test one",
          "content": "This is the first test",
          "time_posted": "2019-02-13 04:45:16"
      }
      ])
    })
    
    test('should return a json object', async () => {
      const response = await request(server).get('/note/1')

      expect(response.type).toMatch(/json/i)
    })
  })
  
  describe('POST /note/create', () => {
    afterEach( async () => {
      await db('notes').truncate()
    })

    test('should return successful message', async () => {
      const note = {title: 'testing post', content: 'testing post content'}
      const response = await request(server).post('/note/create').send(note)

      expect(response.body).toEqual({success: "the note has been added"})
    })
  })

  describe('PUT /note/id/edit', () => {
    afterEach( async () => {
      await db('notes').truncate()
    })

    test('should return a succesful message', async () => {
      const change = {title: 'updating the title', content: 'title should stay the same'}
      const response = await request(server).put('/note/3/edit').send(change)
      
      expect(response.body).toEqual({success: "the note has been updated"})
    })
  })
  
  describe('DELETE /note/:id/delete', () => {
    afterEach( async () => {
      await db('notes').truncate()
    })

    test('should return a successful message', async () => {
      const response = await request(server).delete('/note/3/delete')

      expect(response.body).toEqual({success: "the note has been deleted"})
    })
  })
})
