const express = require('express');
const  helmet = require('helmet');
const morgan = require('morgan');
const RouterForNoteApp = require('../routers/routers');

module.exports = (server) =>{
    server.use(
        express.json(),
        helmet(),
        morgan('dev')
    );
    server.use('/note', RouterForNoteApp)
}