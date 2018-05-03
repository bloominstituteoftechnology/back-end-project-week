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
      if (err) return console.log(err);
      console.log("Test DB Connection Achieved");
    });
    done();
  });
  after(done => {
    mongoose.connection.close();
    done();
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
        done();
      }
      userId = savedUser._id;
      done();
    });
  });
  afterEach(done => {
    User.remove({}, err => {
      if (err) console.log(err);
      return done();
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
        });
    });
  });
});
