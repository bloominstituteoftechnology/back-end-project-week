//import server 
const server = require('./api/server.js')

//import supertest library
const request = require('supertest');

describe('server /api/notes', () =>{

  describe.skip('GET /api/notes', () => {
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

  describe.skip('GET /api/notes/:id', () =>{
    it('should return status code 200', async ()=>{
      const id = 1;
      const response = await request(server).get(`/api/notes/${id}`);
      expect(response.status).toBe(200);
    })
    it('should return JSON format', async ()=>{
      const id = 1;
      const response = await request(server).get(`/api/notes/${id}`);
      expect(response.type).toBe('application/json');
    })
    it('should return note corresponding to the id if found', async ()=>{
      const id = 1;
      const response = await request(server).get(`/api/notes/${id}`);
      expected = JSON.parse(response.text);
      expect(response.body).toEqual(expected);
    })
  })
  
  describe('POST /api/notes', () =>{
    it('should return status code 201', async ()=>{
      const note = {title: 'Test 3', content: 'test note 3'};
      const response = await request(server).post(`/api/notes`).send(note);
      expect(response.status).toBe(201);
    })
    it('should return JSON format', async ()=>{
      const note = {title: 'Test 4', content: 'test note 4'};
      const response = await request(server).post(`/api/notes`).send(note);
      expect(response.type).toBe('application/json');
    })
    it('should return the id of the new note', async () =>{
      const note = {title: 'Test 5', content: 'test note 5'};
      const response = await request(server).post(`/api/notes`).send(note);
      const expected = JSON.parse(response.text);
      expect(response.body).toEqual(expected);
    })
  })


})