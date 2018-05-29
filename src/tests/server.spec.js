const mongoose = require('mongoose')
const server = require('../server/server')
const request = require('supertest')
const { userName, password } = require('faker').internet

describe('API server', () => {
  it('says hello when greeted at the front door', async () => {
    const response = await request(server).get('/')
    expect(response.status).toBe(200)
    expect(response.body).toEqual({ message: 'hello' })
  })

  describe('authentication routes', () => {
    ['register', 'login'].forEach(route => {
      it(`provides a token when valid user credentials are POSTed to ${route}`, async () => {
        const url = `/api/user/${route}`
        const userData = {
          username: userName(), 
          password: password()
        }

        const response = await request(server).post(url).send(userData)
        expect([200, 201]).toContain(response.status)
        expect(response.body.token).toBeDefined()
      })
    })
  })
})