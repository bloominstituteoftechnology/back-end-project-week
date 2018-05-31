const mongoose = require('mongoose')
const server = require('../server/server')
const request = require('supertest')(server)
const User = require('../models/User')
const Note = require('../models/Note')
const faker = require('faker')
const { getSessionToken } = require('../server/util')
const { mongoTestUri, mongoOptions } = require('../server/config')

const { userName, password } = faker.internet
const { sentence, paragraph } = faker.lorem

describe('API server', () => {
  beforeAll(() => mongoose.connect(mongoTestUri, mongoOptions))
  afterAll(() => mongoose.disconnect())

  it('says hello when greeted at the front door', async () => {
    const response = await request.get('/')
    expect(response.status).toBe(200)
    expect(response.body).toEqual({ message: 'hello' })
  })

  describe('Auth routes', () => {
    let userData = {
      username: userName(),
      password: password()
    }

    afterEach(() => User.remove())
    
    it('Provides a token when a new user is created', async () => {
      const response = await request
        .post('/api/user/register')
        .send(userData)
      
      expect(response.status).toBe(201)
      expect(response.body.token).toBeDefined()
    })

    it('Provides a token when an existing user is logged in', async () => {
      const user = await User.create(userData)
      const response = await request
        .post('/api/user/login')
        .send({ username: user.username, password: userData.password })
      
      expect(response.status).toBe(200)
      expect(response.body.token).toBeDefined()
    })
  })

  describe('Note routes', () => {
    let token, user

    beforeEach(async () => {
      const document = await User.create({ username: userName(), password: password() })
      user = document 
      token = getSessionToken(document)
    })

    afterEach(() => Note.remove())
    afterAll(() => User.remove())

    it('Allows access to requests with a valid token', async () => {
      const response = await request
        .get('/api/note/')
        .set('token', token)
      
      expect(response.status).toBe(200)
    })

    it('Denies access to requests with a missing or invalid token', async () => {
      let missingResponse = await request
        .get('/api/note/')
      
      let invalidResponse = await request
        .get('/api/note/')
        .set('token', 'invalid')
      
      expect(missingResponse.status).toBe(400)
      expect(invalidResponse.status).toBe(404)
    })

    it('Creates a note', async () => {
      const noteData = {
        title: sentence(),
        content: paragraph()
      }
      const response = await request
        .post('/api/note/')
        .set('token', token)
        .send(noteData)
      
      expect(response.status).toBe(201)
      expect(response.body.note).toMatchObject(noteData)
    })

    it('Updates a note', async () => {
      const noteData = {
        title: sentence(),
        content: paragraph()
      }
      const note = await Note.create({ author: user._id, ...noteData })
      const response = await request
        .put(`/api/note/${note._id}`)
        .set('token', token)
        .send(noteData)
      
      expect(response.status).toBe(200)
      expect(response.body.note).toMatchObject(noteData)
    })

    it('Deletes a note', async () => {
      const noteData = {
        title: sentence(),
        content: paragraph()
      }
      const note = await Note.create({ author: user._id, ...noteData })
      const response = await request
        .delete(`/api/note/${note._id}`)
        .set('token', token)
      
      expect(response.status).toBe(200)
      expect(response.body.deleted).toMatchObject(noteData)
    })

    it('Displays a list of notes', async () => {
      const notes = []
      for (let i = 0; i < 5; i++) {
        notes.push({ title: sentence(), content: paragraph(), author: user._id })
      }
      await Note.insertMany(notes)
      const response = await request
        .get('/api/note/')
        .set('token', token)
      
      expect(response.status).toBe(200)
      expect(response.body.notes).toHaveLength(5)
    })
  })
})