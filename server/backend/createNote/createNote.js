const express = require( 'express' );
const router = express.Router();

const Notes = require( '../notesModel/notesModel.js' )

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
