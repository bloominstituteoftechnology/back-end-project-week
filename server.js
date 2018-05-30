const express = require('express'); 
const cors = require('cors'); 
const server = express(); 
const mongoose = require('mongoose');
const Routes = require('./src/notes/noteRouter'); 

const mlab =  'mongodb://imsdhk:75W238st@ds121599.mlab.com:21599/backend_lambda'; 


server.use(cors({})); 
server.use(express.json()); 



mongoose.connect(mlab, () => {
    console.log('connected to mLab');
});



server.get('/', (req, res) => {
    res.json({message: 'hello'})
})


server.use('/', Routes)


const port =  process.env.PORT || 33333 
server.listen(port, (err) => {
    if(err) console.log(err);

    console.log('connected to ' + port);
})