require('dotenv').config(); // loads .env configuration

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

// Authentication middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and 
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://YOUR_AUTH0_DOMAIN/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'YOUR_API_IDENTIFIER',
  issuer: `https://YOUR_AUTH0_DOMAIN/`,
  algorithms: ['RS256']
});

const server = express();

server.use(helmet());
server.use(cors() )
server.use(express.json());

const helperMethods = require('./data/helper-methods.js');

server.get('/', (req, res) => {
  res.send(`Api running on port: ${port}`);
});

server.get('/api/note/', (req,res)=>{

    helperMethods.getNotes()
      .then(notes=>{
        res.status(200).json(notes);
      })
      .catch(err=>res.status(500).json(err));
});

server.get('/api/note/:id',(req,res)=>{
  const id = req.params.id;
  helperMethods.getNote(id)
      .then(note=>{
          // console.log(note);
          if (note && note != {}){
              res.status(200).json(note);
          } else {
              res.status(404).json({
              Error: "ID not found"
              })
          }
          })
      .catch(err=>res.status(500).json(err));
});

server.post('/api/note/', (req, res)=>{
  const note = req.body;
  helperMethods.addNote(note)
      .then(id=>{
          res.status(201).json(note);
      })
      .catch(err=>res.status(500).json(err));
});

server.delete('/api/note/:id', (req, res)=>{
  const id = req.params.id;
  helperMethods.deleteNote(id)
    .then(notes =>{
      if (notes && notes.length != 0){
        res.status(200).json({
          Success: "Note deleted."
        });
      } else {
          res.status(404).json({
            Error: "ID not found"
          })
      }
    })
    .catch(err=>res.status(500).json(err));
});

server.put('/api/note/:id', (req, res)=>{
  const id = req.params.id;
  const newNote = req.body;
  helperMethods.updateNote(id, newNote)
    .then(notes =>{
      if (notes && notes.length != 0){
        res.status(200).json({
          Success: "Note updated."
        });
      } else {
        res.status(404).json({
          Error: "ID not found"
        })
      }
    })
    .catch(err=>res.status(500).json(err)); 
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 9000;
}

server.listen(port, ()=>console.log('\nAPI running on 9000\n'));