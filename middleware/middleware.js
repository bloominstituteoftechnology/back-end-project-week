const express = require('express');
const  helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const RouterForNoteApp = require('../routers/routers');
const options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
      res.set('x-timestamp', Date.now())
    }
  }
  
  
module.exports = (server) =>{
    server.use(
        express.json(),
        cors(),
        helmet(),
        morgan('dev'),
       
    );
    server.use('/note', RouterForNoteApp)
    server.set('etag', false) 
}