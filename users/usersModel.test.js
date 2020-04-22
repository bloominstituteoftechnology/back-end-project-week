const request = require("supertest");
const app = require("../api/server");
const db = require("../data/dbConfig");

describe("Auth Router", () => {
  describe("register", () => {
    it("should block users from registering with missing username", async () => {
      const res = await request(app)
        .post("/auth/register")
        .send({ username: "", password: "testing" });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toEqual({
        error: "username must be included and must be a string"
      });
    });
    it("should block users from registering with missing password", async () => {
      const res = await request(app)
        .post("/auth/register")
        .send({ username: "tester", password: "" });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toEqual({
        error: "password must be included and must be a string"
      });
    });
    it("should successfully register users with correct information", async () => {
      const res = await request(app)
        .post("/auth/register")
        .send({ username: "tester", password: "testing" });
      expect(res.statusCode).toEqual(201);
    });
  });
  describe("login", () => {
    it("should block users from logging in with missing username", async () => {
      const res = await request(app)
        .post("/auth/login")
        .send({ username: "", password: "testing" });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toEqual({
        error: "username must be included and must be a string"
      });
    });
    it("should block users from logging in with missing password", async () => {
      const res = await request(app)
        .post("/auth/login")
        .send({ username: "tester", password: "" });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toEqual({
        error: "password must be included and must be a string"
      });
    });
    it("should block users from logging in with incorrect credentials", async () => {
      const res = await request(app)
        .post("/auth/login")
        .send({ username: "lester", password: "pass" });
      expect(res.statusCode).toEqual(401);
      expect(res.body).toEqual({ message: "Incorrect Login Information!" });
    });
    it("should successfully login users with correct information", async () => {
      const res = await request(app)
        .post("/auth/login")
        .send({ username: "abc", password: "password" });
      expect(res.statusCode).toEqual(200);
    });
  });
});
