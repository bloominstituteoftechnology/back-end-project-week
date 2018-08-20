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
})