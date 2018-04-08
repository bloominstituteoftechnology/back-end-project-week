const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const demoSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

// mongoose.connect('mongodb://localhost/demoSchema');

module.exports = mongoose.model('SINGULAR', demoSchema);
/* TO CLARIFY - the mongoose.connect() method (see the server.js file)
establishes the name of the MongoDB Database:
  mongoose.connect('mongodb://localhost/DATABASENAME');

A MongoDB databse COLLECTION name is introduced as the first parameter
in the mongoose.model() method. The mongoose.model() method takes a string
as the first argument, e.g. 'SINGULAR' and will make the collection name
lowercase and PLURAL such that the mongo console commands will return
the following:

$ mongo
MongoDB shell version v3.6.3
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 3.6.3
Server has startup warnings:
2018-04-08T02:42:19.243-0400 I CONTROL  [initandlisten]
2018-04-08T02:42:19.243-0400 I CONTROL  [initandlisten] ** WARNING: Access control is not enabled for the database.
2018-04-08T02:42:19.243-0400 I CONTROL  [initandlisten] **          Read and write access to data and configuration is unrestricted.
2018-04-08T02:42:19.243-0400 I CONTROL  [initandlisten]
2018-04-08T02:42:19.243-0400 I CONTROL  [initandlisten] ** WARNING: This server is bound to localhost.
2018-04-08T02:42:19.243-0400 I CONTROL  [initandlisten] **          Remote systems will be unable to connect to this server.
2018-04-08T02:42:19.243-0400 I CONTROL  [initandlisten] **          Start the server with --bind_ip <address> to specify which IP
2018-04-08T02:42:19.243-0400 I CONTROL  [initandlisten] **          addresses it should serve responses from, or with --bind_ip_all to
2018-04-08T02:42:19.244-0400 I CONTROL  [initandlisten] **          bind to all interfaces. If this behavior is desired, start the
2018-04-08T02:42:19.244-0400 I CONTROL  [initandlisten] **          server with --bind_ip 127.0.0.1 to disable this warning.
2018-04-08T02:42:19.244-0400 I CONTROL  [initandlisten]
> show dbs
DATABASENAME  0.000GB
admin         0.000GB
config        0.000GB
local         0.000GB
> use DATABASENAME
switched to db DATABASENAME
> show collections
singulars <-------------------------- DING DING DING DING DING!
*/
