const request = require('supertest')(require('./server'))

describe('Display a list of notes', () => {
  it('GET /notes should respond with a 200 status code', async () => {
    const res = await request.get('/notes')
    expect(res.status).toBe(200)
  })
  it('should send json with an array of notes with title and content fields', async () => {
    const res = await request.get('/notes')
    expect(res.type).toBe('application/json')
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          content: expect.any(String)
        })
      ])
    )
  })
})

describe('Create a note with title and content', () => {
  it('POST /notes should respond with a 400 status code if title and content body fields are missing from request', async () => {
    const res = await request.post('/notes')
    expect(res.status).toBe(400)
  })
  it('POST /notes should respond with a 200 status code if title and content body fields are provided', async () => {
    const res = await request.post('/notes')
      .send({title: 'yo', content: 'hello world'}) 
      .set('Content-Type', 'application/json') 
      
    expect(res.status).toBe(200)
  })
  it('should send json with object containing id, title, and content of new note', async () => {
    const res = await request.post('/notes')
      .send({title: 'yo', content: 'hello world'})
      .set('Content-Type', 'application/json')
      expect(res.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          content: expect.any(String)
        })
      )
  })
})

describe('View an existing note', () => {
  it('should return a 404 status code if note not found', async () => {
    const res = await request.get('/notes/100')
    expect(res.status).toBe(404)
  })
})
