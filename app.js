const express = require('express');
const mongoose = require('mongoose');
const noteRouters = require("./Controllers/NoteRoutes")
const app = express();

app.use(express.json());



mongoose
  .connect('mongodb://jaivon:massena890@ds237700.mlab.com:37700/lambdanotesdb')
  .then(mongo =>{ console.log('connected to database')}
  )
  .catch(err => {
    console.log('Error connecting to database', err)
  })

  app.get("/",(req, res)=>{
    res.send('Api running');
  })
  app.use("/api/notes", noteRouters)


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
