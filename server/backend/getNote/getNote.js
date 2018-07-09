const express = require( 'express' );
const router = express.Router();

const Notes = require( '../notesModel/notesModel.js' )
// this  get note
router
    .route( '/' )
    .get( ( req, res ) =>
    {
        Notes
            .find()
            .then( note =>
            {
                res.status( 200 ).json( { note } )
            } )
            .catch( err =>
            {
                console.log( err );
                res.status( 500 ).json( { errorMessage: 'can not find note' } )
            } )
    } )

router
    .route( '/:id' )
    .get( ( req, res ) =>
    {
        const { id } = req.params;
        Notes
            .findById( id )
            .then( note =>
            {
                res.status( 200 ).json( { note } )
            } )
            .catch( err =>
            {
                console.log( err );
                res.status( 500 ).json( { errorMessage: err } )
            } )
    } )



module.exports = router;
