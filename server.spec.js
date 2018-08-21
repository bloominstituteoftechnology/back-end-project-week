const request = require('supertest');
const server = require('./server');

describe('Lambda Notes Server API Testing', () => {

  describe('GET REQUESTS, Documentation [/api]', () => {
    it('should return a status code of 200', async () => {
      const expected = 200;
      const result = await request(server)
      .get('/api')
      .then(response =>{
        expect(response.status).toBe(expected);
      })

    });

    it('should return JSON format', async () => {
      const expected = 'application/json';
      const result = await request(server)
      .get('/api')
      .then(response =>{
        expect(response.type).toBe(expected);
      })
     });

     it('should return a success message in JSON format', async () => {
       const expected = {"message": "API server running"};
       const result = await request(server)
       .get('/api')
       .then(response =>{
         expect(response.body).toEqual(expected);
       }) 
    });



  });
  
  
});

