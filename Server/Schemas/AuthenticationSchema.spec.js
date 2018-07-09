const request = require("supertest");
const AuthSchema = require("./AuthenticationSchema");
const mongoose = require("mongoose");

describe('auth model', () => {
    const newAuth = {
        username: "CMVNK", 
        password: "temp1234", 
        confirmedPassword: "temp1234", 
        firstName: "Christina", 
        lastName: "Kopecky", 
        cohort: "CS10"}

    beforeAll(()=> {
        return mongoose.connect("mongodb://localhost:27017/testDb")
    });
    afterEach(()=> {
        return AuthSchema.remove();
    });
    afterAll(()=> {
        return mongoose.disconnect();
    });

    it("should have a username that's a string", async () => {
        const newUser = await AuthSchema.create(newAuth);
        expect(newUser.username).toBe("CMVNK");
        expect(typeof newUser.username).toBe("string")
    });
    it("should have a password that's a hashed string", async () => {
        const newUser = await AuthSchema.create(newAuth);
        expect(typeof newUser.password).toBe("string");
        expect(newUser.password).toHaveLength(60);

    });
    it("should have a firstName that's a string", async () => {
        const newUser = await AuthSchema.create(newAuth);
        expect(newUser.firstName).toBe("Christina");
        expect(typeof newUser.firstName).toBe("string")
    });
    it("should have a lastName that's a string", async () => {
        const newUser = await AuthSchema.create(newAuth);
        expect(newUser.lastName).toBe("Kopecky");
        expect(typeof newUser.lastName).toBe("string")
    });
    it("should have a cohort that's a string", async () => {
        const newUser = await AuthSchema.create(newAuth);
        expect(newUser.cohort).toBe("CS10");
        expect(typeof newUser.cohort).toBe("string")
    });
    it("should have newUser that is an object", async () => {
        const newUser = await AuthSchema.create(newAuth);
        expect(typeof newUser).toBe("object");
    })
})