const router = require( 'express' ).Router();
const jwt = require( 'jsonwebtoken' );
const secret = "";

const User = require( '../userModel/userModel.js')

function generateToken( user )
    {
    console.log( "testing helper function" );
    const options = {
       expiresIn: '1h' 
    }

    const payload = { name: user.username }
    return jwt.sign( payload, secret, options )
}

const validateToken = ( req, res, next ) =>
{
    
    const token = req.headers.token;
    if ( !token )
    {
        res
            .status( 422 )
            .json( { error: 'no token found' } );
    } else {
        jwt.verify( token, secret, ( err, decoded ) => {
            if ( err )
            {
                res
                    .status( 401)
                    .json( { error: "Token invalid, please login", message: err })
    } else {
        next();
    }
});
    }
};
router
    .get( 'list', validateToken, ( req, res ) =>
    {
        User
            .find()
            .select( 'username' )
            .then( user =>
            {
            console.log("/list :", user)
        })
        
    } )
router
    .post( '/register', ( req, res ) =>
    {
        const { username, password } = req.body;
        const user = new User( { username, passwird } );

        user.save( ( err, user ) =>
        {
            if ( err ) return res.send( err );

            const token = generateToken( { username: user.username } );
            res.json( { token } );
        } );
    } );
router
    .post( '/sign', ( req, res ) =>
    {
    
})
