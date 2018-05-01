const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const chaiHTTP = require('chai-http');

User = require('../users/userModel');
const config = require('../api/config');

const server = require('../server');

//chai.use(chaiHTTP);

///describe('Users', () => {
// before(done => {
//     mongoose.Promise = global.Promise;
//     mongoose.connect(config.testDb);
//     const testDb = mongoose.connection;
//     testDb.on("error", () =>
//         console.error.bind(console, "connection error"),
//     );
//     testDb.once("open", () => {
//         console.log("we are connected");
//         done();
//     });
// });
// after(done => {
//     mongoose.connection.db.dropDatabase(() => {
//         mongoose.connection.close(done);
//         console.log("we are disconnected");
//     });
// });
// let userId;
// beforeEach(done => {
//     const testUser = new User({
//         username: "Luis",
//         password: 123456,
//         firstname: "Luis",
//         lastname: "Hernandez",
//         tags: [],
//         notes: [],
//         contactInfo: {
//             email: "asdf@gmail.com",
//         },
//     });
//     testUser.save((err, savedUser) => {
//         if (err) {
//             done(err);
//         }
//         userId = testUser._id.toString();
//         done();
//     });
// });
// afterEach(done => {
//     testUser.remove({}, err => {
//         if (err) {
//             done(err);
//         }
//         let userId;
//         done();
//     });
// });
//});
