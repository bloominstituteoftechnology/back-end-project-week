const mongoose = require('mongoose');

const User = require('./userModel');

describe('User Model', () => {
    const exampleUser = {
        username: 'Nando',
        password: '123456',
        notes: [
            { title: 'blablabla', body: 'blalbablablabalbabl' }
        ]
    }
    beforeAll(() => {
        return mongoose
            .connect('mongodb://localhost/backend')
            .then(() => console.log('\n=== connected to TEST DB ==='))
    })
    afterAll(() => {
        return mongoose
            .disconnect()
            .then(() => console.log('\n=== disconnected from TEST DB ==='))
    })
    beforeEach(async () => {
        await User.create(exampleUser)
    })
    afterEach(async () => {
        await User.remove()
    })

    it('Saves the exampleUser to the database & saves all data', async () => {
        const users = await User.find({})
        const username = 'Nando'

        expect(users[0]).toHaveProperty('username', username.toLowerCase())
        expect(users[0]).toHaveProperty('_id')
        expect(users[0].password).toHaveLength(60)
    })

    it('returns an error if required data is missing when creating a user', async () => {
        // Workaround for mongoose errors, as they are hard to match w/ a string for example
        let error
        try {
            await User.create({})
        } catch (e) {
            error = e
        }
        expect(error.errors).toBeTruthy()
    })

    it('Hashes the password before saving it to the database', async () => {
        const users = await User.find({})

        expect(users[0].password).not.toMatch('123456')
        expect(users[0].password).toHaveLength(60)
    })

    it('authenticates the user, when the right password is provided', async () => {
        const user = await User.find({})
        const bcryp = await user[0].authenticate(exampleUser.password)
        await expect(bcryp).toBe(true)
    })

    it('refuses to authenticate the user, when the wrong password is provided', async () => {
        const user = await User.find({})
        const bcryp = await user[0].authenticate('1234123412341241234')
        await expect(bcryp).toBe(false)
    })
})