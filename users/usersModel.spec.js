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
            const grabUser6 = await usersModel.get(6)
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
    });

    describe('testing Update user', () => {
        it("should update a user's data", async () => {
            let grabUser3 = await usersModel.get(3)
            grabUser3.username = 'Updated UserName'
            const updatedUser3 = await usersModel.update(3, grabUser3)
            let newUser3 = await usersModel.get(3)
            expect(newUser3.username).toBe('Updated UserName')
        });

        it('should update the username of the user', async () => {
            let grabUser1 = await usersModel.get(1)
            grabUser1.username = 'Updated User 1'
            const updatedUser1 = await usersModel.update(1,grabUser1)
            const user1 = await usersModel.get(1)
            expect(user1.username).toBe('Updated User 1')
        });

        it('should update the password of the user', async () => {
            let grabUser2 = await usersModel.get(2)
            grabUser2.password = 'Updated Password 2'
            const updatedUser1 = await usersModel.update(2, grabUser2)
            const user2 = await usersModel.get(2)
            expect(user2.password).toBe('Updated Password 2')
        });
    })

    describe('testing removal of user', () => {
        it('should remove an unwanted user', async () => {
            const deleteUser1 = await usersModel.remove(1)
            expect (deleteUser1).toBe(1)
        });

        it('Removes a user decreasing the amount of users by 1', async () => {
            const deleteUser1 = await usersModel.remove(1)
            const usersList = await usersModel.get()
            expect(usersList.length).toBe(4)
        });

        it('Should not remove a note when the user inputs an incorrect id', async () => {
            const faultyUserData = await usersModel.remove(77)
            expect(faultyUserData).toBe(0)
        });
    });
})