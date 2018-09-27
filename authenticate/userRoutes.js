const bCrypt=require('bcryptjs');
const axios=require('axios');
const db=require('../dbConfig/db');
const {authenticate,secret,jwt}=require('./middleware.js');
const Joi=require('joi');

module.exports=server=>{
    server.post('/api/register',register);
    server.post('/api/login',validateNewUserCred, login);
    server.get('/api/notes',authenticate,getNotes);
}
generateToken=(user)=>{
    const payload={
        username:user.username
    }
    const options={
        expiresIn:'24h',
        subject:user.id.toString()
    }
    return jwt.sign(payload,secret,options);
}
function validateNewUserCred (req,res,next){
    const newUser=req.body;
    console.log(newUser);
    const schema={
        username:Joi.string.min(3),
        password:Joi.string.min(3)
    }
    const {error,value}=Joi.validate(req.body,schema);
    if (error===null) {
        next();
    }
    else {
        return res.status(500).json(err);
    }
}
function register(req,res) {
    const newUser=req.body;
    const hash=bCrypt.hashSync(newUser.password,3);
    newUser.password=hash;

    db('users')
        .insert(newUser)
        .then(id=>{
            const userId=id[0];
            db('users')
                .where({id:userId})
                .then(response=>{
                    const token=generateToken(response[0]);
                    res.status(201).json(token);
                })
                .catch(err=>res.status(500).json(err))
        })
        .catch(err=>res.status(500).json(err))
}
function login(req,res){
    const loggedIn=req.body;
    db('users')
        .where({username:loggedIn.username})
        .then(user=>{
            const currentUser=user[0];
            if (loggedIn && bCrypt.compareSync(loggedIn.password,currentUser.password)) {
                const token=generateToken(currentUser);
                res.status(200).json(token);
            } else {
                res.status(401).json({message:'Invalid Credentials'})
            }
        })
        .catch(err=>res.status(500).json(err));
}
function getNotes(req,res){
    axios
        .get('https://notes-lambda.herokuapp.com/note/get/all')
        .then(response=>{res.status(200).json(response.data)})
        .catch(err=>res.status(500).json({message:'Error fetching notes.',error:err}));
}