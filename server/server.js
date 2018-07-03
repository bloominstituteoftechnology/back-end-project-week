//my imports
const express = require( 'express' );
const cors = require( 'cors' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );

const server = express();
//my server commmands

server.use( cors() );
server.use( express.json() );

//where my information is getting imported from
const getNote = require( './backend/getNote/getNote.js' );
const createNote = require( './backend/createNote/createNote.js' )
const deleteNote = require( './backend/deleteNote/deleteNote.js' )
const editNote = require( './backend/editNote/editNote.js' )


const Notes = require( './backend/notesModel/notesModel.js' )

//where my endpoints are coming in from
server.use( '/api/get', getNote );
server.use( '/api/create', createNote );
server.use( '/api/delete', deleteNote );
server.use( '/api/edit', editNote );

//this shows me me that my server is running
server.get( '/', ( req, res ) =>
{
    res.status( 200 ).json( { api: 'running' } )
} )

// mongoose.Promise = global.Promise;
// mongoose.connect( 'mongo ds123981.mlab.com:23981/april ', {}, ( err =>
// {
//     err ? console.log( err ) : console.log( 'Mongoose is connected to our Database' )
// } ) )
//this show me what port my server is going use 
const port = process.env.PORT || 5000;
server.listen( port, () =>
{
    console.log( `Server up and running on ${ port }` )
} )
