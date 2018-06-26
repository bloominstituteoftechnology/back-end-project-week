const express  = require('express');
// const port = process.env.PORT || 3333;
const mongoose = require('mongoose');
// const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const users = require('./userModel');
// const notes = require('./noteModel');
const setupMiddleware = require('./_config/middleware');
setupRoutes = require('./_config/routes');

const server = express();


// const corsOptions = {
//     origin: 'http://localhost:3000', // allow only the React application to connect
//     credentials: true, //sets the Access-Control-Allow-Credentials CORS header 
// };

// server.use(express.json());
// server.use(cors(corsOptions)); 

// mongoose.Promise = global.Promise;

setupMiddleware(server);
setupRoutes(server);

mongoose.connect('mongodb://localhost/dbLambdaNotes', {}, (err) => {
    if(err) {
        console.log(err);
        return;
    } 
    console.log("Successfully Connected to MongoDB");
});

// // sanity check 
// server.listen(port, () => {
//     console.log(`Server up and running on port ${port}`);
// });