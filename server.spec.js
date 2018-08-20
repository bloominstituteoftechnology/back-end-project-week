const req = require('supertest')

const server = require('./server.js')

const statusCodePass = 200
const statusCodeFail = 404
const statusCodeInc = 422
const statusCodeNA = 405

describe('Server Testing', () => {
  it('Basic Get from root /', async () => {

    const res = await req(server).get('/')
  
    expect(res.status).toEqual(statusCodePass)
    expect(res.body).toEqual({msg:"It works!"})
  });

  it('GET /notes should return an array of notes', async () =>{

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