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
      userId = savedUser._id;
      done();
    });
  });
  afterEach(done => {
    User.remove({}, err => {
      if (err) console.log(err);
      done();
    });
  });

  describe("[POST] /api/users", () => {
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
          expect(response.status).to.equal(201);
          expect(response.body).to.be.an("object");
          expect(response.body.username).to.equal("newuser");
          done();
        });
    });
  });
});
