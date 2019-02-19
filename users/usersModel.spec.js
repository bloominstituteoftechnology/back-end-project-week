const usersModel = require('./usersModel.js');
const db = require('../data/dbConfig.js');
const request = require('supertest');

beforeEach( () => {
    return db.migrate.rollback()
        .then( () => {
            return db.migrate.latest()
            .then( () => {
                return db.seed.run()
            })
        })
});

describe('The Users Model', () => {

    describe('Testing Get Functionality', () => {
        it('Should get all users', async () => {
            const userList = await usersModel.get()
            expect(userList.length).toBe(5)
        });

        it('Should fetch an individual user by ID', async () => {
            const grabUserData = await usersModel.get(2)
            expect(grabUserData.username).toBe('user2')
        });

        it('Should return an empty array when empty', async () => {
            const deleteUser1 = await usersModel.remove(1)
            const deleteUser2 = await usersModel.remove(2)
            const deleteUser3 = await usersModel.remove(3)
            const deleteuser4 = await usersModel.remove(4)
            const deleteUser5 = await usersModel.remove(5)
            const userList = await usersModel.get()
            expect (userList).toEqual([])
        })
    });

    describe('Testing insert functionality', () => {
        it('should create a new user', async () => {
            const user6 = await usersModel.insert({
                username: 'user6',
                password: 'pass6'
            })
        });
        const grabUser6 = await usersModel.insert(6)
        expect(grabUser6.username).toBe('user6')
    });

    it('should not create a new user when missing a username', async () => {
        const faultyUser = await usersModel.insert({
            password: 'Faulty User'
        })
        expect(faultyUser).toBe('Please enter a user with a username and password.');
    });

    it('should not create a new user while missing a password', async () => {
        const faultyUser = await usersModel.insert({
            username: 'Faulty User'
        })
        expect(faultyUser).toBe('Please enter a user with a username and password.');
    });

    describe('testing Update user', () => {
        it("should update a user's data", async () => {
            let grabUser3 = await usersModel.get(3)
            grabUser3.username = 'Updated UserName'
            const updatedUser3 = await usersModel.update(3, grabUser3)
            let newUser3 = await usersModel.get(3)
            expect(newUser3.username).toBe('Updated UserName')
        });

        
    })
})