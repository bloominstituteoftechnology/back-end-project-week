const jwt=require('jsonwebtoken');
const secret='I see dead people.';

function authenticate(req,res,next) {
    const token=req.headers.authorization;
    
    if(token){
        jwt.verify(token,secret,(err,decoded)=>{
            if (err) {
                return res.status(401).json(err);
            } else {
                req.decoded=decoded;
                next();
            }
        })
    } else {
        res.status(401).json({error:'No token provided must be provided on authorization header'});
    }
}
function validateNewUserCred (req,res,next){
    const newUser=req.body;
    const schema={
        username:Joi.string.min(3),
        password:Joi.string.min(3)
    }
    const {error,value}=Joi.validate(newUser,schema);
    console.log(error);
    if (error===null) {
        next();
    }
    else {
        res.status(500).json(err);
    }
}
module.exports={
    jwt,
    secret,
    authenticate,
    validateNewUserCred
}