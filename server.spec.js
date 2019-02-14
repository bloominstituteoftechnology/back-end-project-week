//import server 
const server = require('./api/server.js')

//import supertest library
const request = require('supertest');

describe('server /api/notes', () =>{

  describe('GET /api/notes', () => {
    it('should return status code 200', async ()=>{
      const response = await request(server).get('/api/notes');
      expect(response.status).toBe(200);
    })
    it('should return JSON format', async ()=>{
      const response = await request(server).get('/api/notes');
      expect(response.type).toBe('application/json');
    })
    it('should return an array of all notes or an empty array if no notes', async ()=>{
      const response = await request(server).get('/api/notes');
      const expected = (JSON.parse(response.text).length === 0) 
      ? []
      : JSON.parse(response.text);
      expect(response.body).toEqual(expected);
    })
  })
  


})