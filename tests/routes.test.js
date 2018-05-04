const mongoose = require("mongoose");
const chai = require("chai");
const chaiHTTP = require("chai-http");

const expect = chai.expect;
const server = require("../server");
const User = require("../users/userModel");
const Note = require("../notes/notesModel");

chai.use(chaiHTTP);

describe("Users", () => {
  before(done => {
    mongoose.connect("mongodb://localhost/test", {}, err => {
      if (err) {
        console.log(err);
        done();
      } else {
        console.log("Test DB Connection Achieved");
        done();
      }
    });
  });
  after(done => {
    mongoose.connection.close(err => {
      if (err) {
        console.log(err);
        done();
      } else {
        console.log("Closed DB Connection");
        done();
      }
    });
  });

  let userId;
  beforeEach(done => {
    const newUser = new User({
      username: "testUser",
      password: "testpassword"
    });
    newUser.save((err, savedUser) => {
      if (err) {
        console.log(err);
      }
      userId = savedUser._id.toString();
      console.log(userId);
      done();
    });
  });
  afterEach(done => {
    User.remove({}, err => {
      if (err) console.log(err);
      done();
    });
  });

  describe("[POST] /api/user", () => {
    let user = { username: "newuser", password: "newpassword" };
    it("should add a user to the database and return the new user", done => {
      chai
        .request(server)
        .post("/api/user")
        .send(user)
        .end((err, response) => {
          if (err) {
            console.log(err);
            done();
          }
          //Expects an OK Status
          expect(response.status).to.equal(201);
          //Expects the new user object back
          expect(response.body).to.be.an("object");
          expect(response.body.username).to.equal("newuser");
          //Expects the password to be hashed
          expect(response.body.password).to.not.equal("newpassword");
          expect(response.body.password).to.have.length(60);
          done();
        });
    });
  });

  describe("[POST] /api/user/login", () => {
    let user = { username: "testUser", password: "testpassword" };
    it("should login a user and return an object with the keys: success, user, and token", done => {
      chai
        .request(server)
        .post("/api/user/login")
        .send(user)
        .end((err, response) => {
          if (err) {
            console.log(err);
            done();
          }
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an("object");
          expect(response.body).to.have.property("success");
          expect(response.body.success).to.equal(true);
          expect(response.body).to.have.property("user");
          expect(response.body.user).to.be.an("object");
          expect(response.body.user.username).to.equal("testUser");
          expect(response.body).to.have.property("token");
          expect(response.body.token).to.be.a("string");
          done();
        });
    });
    it("should return a status of 401 if given incorrect credentials", done => {
      chai
        .request(server)
        .post("/api/user/login")
        .send({ username: "wrong", password: "wrong" })
        .end((err, response) => {
          if (err) {
            console.log(err);
            done();
          }
          expect(response.status).to.equal(401);
          done();
        });
    });
    it("should return a status of 500 if given missing credentials", done => {
      chai
        .request(server)
        .post("/api/user/login")
        .send({ username: "blah" })
        .end((err, response) => {
          if (err) {
            console.log(err);
            done();
          }
          expect(response.status).to.equal(400);
          done();
        });
    });
  });
  describe("[PUT] /api/user/:id", () => {
    it("should accept an updated user object, put it to the database, and return the updated user", done => {
      chai
        .request(server)
        .put(`/api/user/${userId}`)
        .send({ username: "updatedname" })
        .end((err, response) => {
          if (err) {
            console.log(err);
            done();
          }
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an("object");
          done();
        });
    });
  });
});
