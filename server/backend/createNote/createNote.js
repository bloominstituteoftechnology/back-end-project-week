const express = require( 'express' );
const router = express.Router();
const jwt = require( "jsonwebtoken" );




const Notes = require( '../notesModel/notesModel.js' )
//this router will allow me to post new info to my database 
router
    .route( '/note' )
    .post( ( req, res ) =>
    {
        const { title, content } = req.body;
        const newNote = new Notes( { title, content } );
        newNote
            .save()
            .then( note =>
            {
                res.status( 201 ).json( { note } )
            } )
            .catch( err =>
            {
                conole.log( err )
                res.status( 500 ).json( { errorMessage: err } )
            } )
    } )

module.exports = router;
