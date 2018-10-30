const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const server = express();
const knexConfig = require('./knexfile.js')
const db = knex(knexConfig.development)
const cors = require('cors');

server.use(cors());
server.use(helmet());
server.use(express.json());

// ===Get Requests===
server.get('/',(req,res)=>{
  res.send('active')
});
// Get by id
server.get('/api/notes/:id',(req,res)=>{
  console.log(req.params.id)
  const id = req.params.id;
  db("notes").where({id:Number(id)})
  .then(post=>{
    console.log('Success',post);
    res.status(200).json(post)
  })
  .catch(err=>{
    res.send(err);
  })
})


// Get ALL
server.get('/api/notes',(req,res)=>{
  db('notes')
  .select("id","title","content")
  .then(notes=>{
    res.status(200).json(notes);
  })
  .catch(err=>{
    res.send(err);
  })
});


server.post('/api/notes', (req,res)=>{
    const newNote = req.body;
db('notes')
.insert(newNote)
.then(ids=>{
{ id: ids[0] };
  res.status(200).json(newNote)
})
.catch(err=>{
  res.send(err);
})

});

server.put('/api/notes/:id',(req,res)=>{
  const {title,content} = req.body
  const newPost ={title,content}
  const{id}= req.params;
  res.send('');
  db('notes').where('id',Number(id)).update(newPost)
  .then(post=>{
    res.status(200).json(post);
    console.log('Success',post);
  })
  .catch(err=>{
    res.send(err)
  })
})

//delete request
server.delete('/api/notes/:id',(req,res)=> {
  const {id} = req.params;
  db('notes').where('id',Number(id)).del()
  .then(removedPost=>{
    res.json(removedPost);
   console.log(removedPost)
  })
});


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
