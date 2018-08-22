const request = require('supertest');
const server = require('./server');
const knex = require('./data/dbConfig');
process.env.NODE_ENV = 'test';

describe('Lambda Notes Server API Testing', () => {

  describe('GET REQUESTS, Root [/api]', () => {
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
  
  //create docs testing when docs completed.

  describe('GET REQUESTS [/api/notes], ', () => {

    beforeEach(() =>{
     return knex.migrate.rollback()
    .then(() => knex.migrate.latest())
    .then(()=> knex.seed.run())
    })
    afterEach(()=>{
     return knex.migrate.rollback();
    })
    it('should return status code 200 with attempt to get all notes', async () => {
      const expected = 200;
      const result = await request(server)
      .get('/api/notes')
      .then(response =>{
        expect(response.status).toBe(expected);
      }) 
    });

    it('should return JSON', async () => {
      const expected = 'application/json';
      const result = await request(server)
      .get('/api/notes')
      .then(response => {
        expect(response.type).toBe(expected);
      })
    });

    it('should return three seeded notes from the database', async () => {

      const expected = [{
        "id": 1,
        "note_title": "first note",
        "text_body": "First Basics Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc semper rutrum erat, a ullamcorper orci ultricies quis. Nunc dolor leo, commodo ut sapien quis, accumsan placerat augue. Fusce consectetur diam sit amet ipsum molestie fringilla. Sed nec aliquam magna, quis auctor nibh. Nulla dictum urna a suscipit cursus. Fusce auctor sem vitae imperdiet consequat. Integer ullamcorper velit vitae sapien fermentum cursus. Nam sagittis volutpat lorem, molestie fringilla mi molestie vitae.",
        "tags": "FIRST HTML JAVASCRIPT CSS"
      }, {
        "id": 2,
        "note_title": "second note",
        "text_body": "Second Frameworks Nunc dictum vitae odio et faucibus. Proin in lorem turpis. Ut finibus et orci at hendrerit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse blandit, eros et facilisis venenatis, metus quam ullamcorper massa, a efficitur nulla massa eu turpis. Curabitur ut arcu suscipit felis porttitor placerat. Proin vulputate eget ex quis blandit. Morbi mollis viverra sagittis.",
        "tags": "SECOND REACT REDUX STATE"
      }, {
        "id": 3,
        "note_title": "third note",
        "text_body": "Third Databases Proin feugiat dolor lorem, quis condimentum orci suscipit sit amet. Phasellus vel porta est. Aenean vel posuere lorem, sed lobortis sem. Vestibulum ac lacinia magna, vitae tincidunt massa. Donec pellentesque pellentesque sem ut venenatis. Donec lacus nunc, pulvinar vitae ante sed, cursus eleifend metus. Maecenas in urna orci. Phasellus ut mauris vehicula, condimentum dolor in, vehicula nunc. Nunc condimentum dui ligula. Mauris nec velit sodales, laoreet velit cursus, feugiat dui. Morbi tincidunt, leo vel viverra congue, tortor justo tincidunt odio, nec malesuada augue erat vitae sem. Curabitur at augue consectetur, gravida leo pretium, aliquet orci. Fusce turpis quam, tincidunt sit amet feugiat quis, auctor semper magna. Proin hendrerit fermentum interdum.",
        "tags": "THIRD DB SQLITE POSTGRE FIREBASE"
      }];

      const result = await request(server)
      .get('/api/notes')
      .then(response =>{
        expect(response.body).toEqual(expected);
      })

    });

  });

  describe('POST Requests [/api/notes]', () => {
    beforeEach(() =>{ 
       return knex.migrate.latest()
      .then(knex.seed.run());
    });

    afterAll(()=>{
      return knex.migrate.rollback();
    })
  
    //start adding tests for note creation, beforeEach to wipe dB to seeded migration
    it('should return a status code of 201 when a new note is added', async () => {
      const expected = 201;
      const testNote = {'note_title': 'test note', 'text_body':'this is the body of the note', 'tags': 'TEST TEST1'}
      const result = await request(server).post('/api/notes')
      .send(testNote);
      expect(result.status).toBe(expected);

    });

    it('should return JSON', async () => {
      const expected = 'application/json';
      const testNote = {
        'note_title': 'JSON Test note',
        'text_body': 'this is the body of the note',
        'tags': 'TEST TEST2'
      }
      
      const result = await request(server)
      .post('/api/notes')
      .send(testNote)
      expect(result.type).toBe(expected);

    });

     it('should return copy of added JSON Data', async () => {
      
       const testNote = {
         "newNote": {
           "note_title": "JSON Test DATA",
           "tags": "TEST TEST3",
           "text_body": "this is the body of the note"
         }
       }
  
       
      const expected = testNote;

       const result = await request(server)
         .post('/api/notes')
         .send(testNote);

       expect(result.body).toBe(expected);

     });
  });  

});

