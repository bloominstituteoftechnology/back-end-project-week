const request=require('supertest');
const server=require('./server.js');

describe('server.js',()=>{
    describe('index route',()=>{
        it('should return an OK status code from the index route.',async()=>{
            const expectedStatusCode=200;
            const response=await request(server).get('/');
            expect(response.status).toEqual(expectedStatusCode);
        })
        it('should return a JSON object from the index route',async()=>{
            const response=await request(server).get('/');
            expect (response.type).toEqual('application/json');
        })
        it('should return a JSON object that contains a message from the index route',async()=>{
            const expectedBody={message:'API running.'}
            const response=await request(server).get('/');
            expect(response.body).toEqual(expectedBody);
        })
    }) 
    describe('note create route',()=>{
        it('should return a 201 status code on successful POST i.e. all parameters are fulfilled.',async()=>{
            const response=await (request(server)).post('/note/create').send(
                {title:'Chronicles of M',
                textBody:'Written by M',
                user_id:1
            })
            expect(response.status).toEqual(201);
        })
        it('should return an array with the id of the newly created post on successful POST.',async()=>{
            const response=await (request(server)).post('/note/create').send(
                {title:'Chronicles of Z',
                textBody:'Written by Z',
                user_id:1
            })
            expect(response.body[0]).toEqual(2);
        })
        it('should return an error with 500 status code when a object with same title as another object is POSTed',async()=>{
            const response=await (request(server)).post('/note/create').send(
                {title:'Chronicles of Z',
                textBody:'Written by Z',
                user_id:1
            })
            expect(response.status).toEqual(500);
        })
        it('should return an error with status code 404 when an object is missing a required parameter(s) for POST request',async()=>{
            const response=await(request(server)).post('/note/create').send(
                {title:'Chronicles of Narnia',
                user_id:1
                });
                expect(response.status).toEqual(404);
        })
        it('should return a JSON object on successful POST',async()=>{
            const response=await (request(server)).post('/note/create').send(
                {title:'Chronicles of Za',
                textBody:'Written by Za',
                user_id:1
            })
            expect(response.type).toEqual('application/json');
        })
    })
    describe('note get all by user id route',()=>{
        it('should return a 200 status code when all notes are found for a specific user_id',async()=>{
            const user_id=1;
            const response =await(request(server)).get(`/note/get/all/${user_id}`);
            expect(response.status).toEqual(200);
        })
        it('should return a 500 status code when no notes are found for a specific user_id',async()=>{
            const user_id=2;
            const response =await(request(server)).get(`/note/get/all/${user_id}`);
            expect(response.status).toEqual(200);
        })
        it('should return a JSON object when all notes are found for a specific user_id',async()=>{
            const user_id=1;
            const response =await(request(server)).get(`/note/get/all/${user_id}`);
            expect(response.type).toEqual('application/json');
        })
        it('should return an array of all the notes for a specific user_id',async()=>{
            const user_id=1;
            const response =await(request(server)).get(`/note/get/all/${user_id}`);
            const expectedResponse=[{id:1,title:'Chronicles of M',textBody:'Written by M',tags:null,user_id:1},{id:2,title:'Chronicles of Z',
            textBody:'Written by Z',tags:null,user_id:1},{id:3,title:'Chronicles of Za',textBody:'Written by Za',tags:null,user_id:1}]
            expect(response.body).toEqual(expectedResponse);
        })
    })
    describe('note get by id route',()=>{
        it('should return a 200 status code on successful GET request',async()=>{
        const note_id=1;
        const response=await(request(server)).get(`/note/get/${note_id}`);
        expect(response.status).toEqual(200);
    })
    it('should return a JSON object on successful GET request',async()=>{
        const note_id=1;
        const response=await(request(server)).get(`/note/get/${note_id}`);
        expect(response.type).toEqual('application/json');
    })
    it('should return the contents of the note with specified id if found',async()=>{
        const note_id=1;
        const response=await(request(server)).get(`/note/get/${note_id}`);
        const expectedObj={id:1,title:'Chronicles of M',textBody:'Written by M',tags:null,user_id:1};
        expect(response.body[0]).toEqual(expectedObj);
    })
    it('should return an empty array when note with specified is not found',async()=>{
        const note_id=5;
        const response=await(request(server)).get(`/note/get/${note_id}`);
        expect(response.body).toEqual([]);
    })
})
describe('note edit by id route',()=>{
    it('should return a 200 status code on successful put request',async()=>{
        const note_id=1;
        const response=await(request(server)).put(`/note/edit/${note_id}`)
        .send({title:'Chronicles of Riddick',textBody:'Riddick is coming.'});
        expect(response.status).toEqual(200);
    })
    it('should return a 404 status code if there is a missing parameter',async()=>{
        const note_id=1;
        const response=await(request(server)).put(`/note/edit/${note_id}`)
        .send({title:'The Reckoning'});
        expect(response.status).toEqual(404);
    })
    it('should return a JSON object upon successful put request',async()=>{
        const note_id=1;
        const response=await(request(server)).put(`/note/edit/${note_id}`)
        .send({title:'A-Z',textBody:'ABC'});
        expect(response.type).toEqual('application/json');
    })
    it('should return a count of 1 after updating note via put request',async()=>{
        const note_id=1;
        const response=await(request(server)).put(`/note/edit/${note_id}`)
        .send({title:'Warrior 3',textBody:'Henchmen of Thor'});
        expect(response.body).toEqual(1);
    })
    it('shoudl return a count of 0 if the note with specified id does not exist',async()=>{
        const note_id=5;
        const response=await(request(server)).put(`/note/edit/${note_id}`)
        .send({title:'Warrior 3',textBody:'Henchmen of Thor'});
        expect(response.body).toEqual(0);
    })
})
describe('note delete by id route',()=>{
    it('should return a 200 status code on successful delete request',async()=>{
        const note_id=1;
        const response=await(request(server)).delete(`/note/delete/${note_id}`);
        expect(response.status).toEqual(200);
    })
    it('should return a count of 1 on successful delete request',async()=>{
        const note_id=2;
        const response=await(request(server)).delete(`/note/delete/${note_id}`);
        expect(response.body).toEqual(1);
    })
    it('should return a JSON object on successful delete request',async()=>{
        const note_id=3;
        const response=await(request(server)).delete(`/note/delete/${note_id}`);
        expect(response.type).toEqual('application/json');
    })
    it('should return a count of 0 if no note exists with the specified id',async()=>{
        const note_id=3;
        const response=await(request(server)).delete(`/note/delete/${note_id}`);
        expect(response.body).toEqual(0);
    })
})
})