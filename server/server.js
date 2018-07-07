//my imports
const express = require( 'express' );
const cors = require( 'cors' );
const mongoose = require( 'mongoose' );
const jwt = require( 'jsonwebtoken' );
const mysecret = 'April is gonna kick ass';

require( 'dotenv' ).config();

const server = express();

const corsOptions = {
    origin: "http://localhost:5000",
    credentials: true,
};
//my server commmands

server.use( cors() );
server.use( express.json() );

const Token = ( req, res, next ) =>
{
    const token = req.get( 'Authorization' );
    if ( token )
    {
        jwt.verify( token, mysecret, ( err, decoded ) =>
        {
            if ( err ) return res.status( 422 ).json( err );
            req.decoded = decoded;
            next();
        } );
    } else
    {
        return res.status( 403 ).json( {
            error: 'No token given'
        } );
    }
}


//where my information is getting imported from
const getNote = require( './backend/getNote/getNote.js' );
const createNote = require( './backend/createNote/createNote.js' )
const deleteNote = require( './backend/deleteNote/deleteNote.js' )
const editNote = require( './backend/editNote/editNote.js' )
const userLogin = require('./backend/users/userController.js')


//where my endpoints are coming in from
server.use( '/api/get', Token, getNote ); 
server.use( '/api/create', Token, createNote );
server.use( '/api/delete', Token, deleteNote );
server.use( '/api/edit', Token, editNote );
server.use('/api/user/', userLogin)
 
//this shows me me that my server is running
server.get( '/', ( req, res ) =>
{
    res.send( 'DB:${process.env.mongo}' );
} );

mongoose.Promise = global.Promise;
// 'mongo ds123981.mlab.com:23981/april -u april7299 -p charles7229'
// 'mongodb://april7299:charles7229@ds123981.mlab.com:23981/april'
mongoose.connect('mongodb://april7229:charles7229@ds123981.mlab.com:23981/april',  ( err =>
{
    err ? console.log( err ) : console.log( 'Mongoose is connected to our Database' )
} ) )
// this show me what port my server is going use 
const port = process.env.PORT || 5000;
server.listen( port, () =>
{
    console.log( `Server up and running on ${ port }` )
} )
