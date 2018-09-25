const bcrypt=require('bcryptjs');
const axios=require('axios');
const db=require('../dbConfig/db.js');

const secret='I see dead people.';

module.exports=server=>{
    server.post('/api/register',register);
    server.post('/api/login', login);
    server.get('/api/jokes',authenticate,getJokes);
}
generateToken=(user)=>{

}