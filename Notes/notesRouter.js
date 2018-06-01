const router = require('express').Router();

const Note = require('./notes');


// add endpoints here
router
  .route('/:id')
    .get((req, res) => {
        const {id} = req.params
    Note
    .findById(id)
    .then(response=>{
           res.status(202).json(response);
    })
    .catch(err=>{
        res.status(500).json({errorMessage: "The notes information could not be retrieved."})
    })
  })
  .delete((req, res) => {
    const {id} = req.params
    Note
    .findByIdAndRemove(id)
    .then(response=>{
        res.status(204).end()
    })
  })
  .put((req, res) => {
    const {id} = req.params
    const update = req.body;
    const options ={
      new:true,
    }
    Note
    .findByIdAndUpdate(id,update, options)
    .then(response=>{
      res.status(200).json(response)
        })
  });

router.get('/',(req,res)=>{
Note
.find()
.sort('-createdOn')
.then(response=>{
    res.status(200).json(response)
})
.catch(err=>{
    res.status(500).json({err: "The collection of notes could not be obtained."})
})
})
router
.post('/',(req,res)=>{
    const note = new Note(req.body);
    note
    .save()
    .then(response =>{
        res.status(201).json(response)
    }).catch(err =>{
        res.status(500).json({err:"This response could not be added check their status and try again."})
    })
})
module.exports = router;
