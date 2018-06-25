const express = require('express');
const mongoose = require('mongoose');
const config = require('./config.js');
const { dbuser, dbpassword, dbname } = config.secret;
const server = express();

const port = 5000;

// Connect to mlab
mongoose
    .connect(`mongodb://${dbuser}:${encodeURIComponent(dbpassword)}@ds117711.mlab.com:17711/${dbname}`)
    .then(() => {
        console.log('connected to production database');
        if (process.env.NODE_ENV !== 'test') {
            server.listen(port, () =>
                console.log(`Backend is running at ${port}`)
            )
        } else {
            server.listen(port, () =>
                console.log(`Running in Test Environment at ${port}`)
            )
        }
    })
    .catch(err => {
        console.log('error connecting to production database, is MongoDB running?');
    });

