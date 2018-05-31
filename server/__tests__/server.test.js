const mongoose = require('mongoose')
const request = require('supertest')
const faker = require('faker')
const server = require('../server')

const date = faker.date
const { words, word } = faker.random

describe('server', () => {
  it('runs a test', () => {
    expect(server).toBeTruthy()
  })
})
