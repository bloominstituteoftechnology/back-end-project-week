const jwt=require('jsonwebtoken');
const secret='I see dead people.';

function authenticate(req,res,next) {
    const token=req.get('Authorization');
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
module.exports={
    jwt,
    secret,
    authenticate
}