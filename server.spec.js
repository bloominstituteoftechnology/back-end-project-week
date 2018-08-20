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
