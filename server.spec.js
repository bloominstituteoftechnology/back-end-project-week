const req = require('supertest')

const server = require('./server.js')

const statusCodePass = 200
const statusCodeFail = 404
const statusCodeInc = 422
const statusCodeNA = 405

describe('Basic Test', () => {
  it('Ping the root endpoint /', async () => {

    const res = await req(server).get('/')
  
    expect(res.status).toEqual(statusCodePass)
    expect(res.body).toEqual({msg:"It works!"})
  });
})

describe('GET Method /notes', () => {
  it('should return an array of notes', async () =>{
    
    const res = await req(server).get('/notes')
    
    expect(res.status).toEqual(statusCodePass)
    expect(res.body).toEqual([
      {id:0, title :'Title0', content:'Content0'},
      {id:1, title :'Title1', content:'Content1'},
      {id:2, title :'Title2', content:'Content2'},
      {id:3, title :'Title3', content:'Content3'},
    ])
  })
})

describe('GET Method /notes/id - invalid id', () => {
  it('should return a msg saying it was invalid', async () => {
    const res = await req(server).get('/notes/5')
  
    expect(res.status).toEqual(statusCodeFail)
    expect(res.body).toEqual({msg: 'ID not found'})
  })  
})

describe('GET Method /notes/id - valid id', () => {
  it('should return a msg saying it was valid', async () => {
    const res = await req(server).get('/notes/2')
  
    expect(res.status).toEqual(statusCodePass)
    expect(res.body).toEqual({id:2, title :'Title2', content:'Content2'})
  })  
})


