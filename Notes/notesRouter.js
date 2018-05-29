const express = require('express');

const Note = require('./notes');

const router = express.Router();

// add endpoints here

router
.get('/',(req,res)=>{
    Note
    .find()
    .sort("createdOn")
    .then(respone=>{
     res.status(202).json(response)
    })
    .catch(err=>{
        res.status(404).json({error:err})
    })
})
router
.post('/',(req,res)=>{
   const note = new Note(req.body)
   note
   .save()
   .then(respone=>{
       res.status(201).json(response)
   })
   .catch(err=>{
       res.status(500).json({error:err})
   })
})
router
.delete('/:id',(req,res)=>{
    const {id} = req.params
    Note
    .findByIdAndRemove(id)
    .then(response=>{
        res.status(204).end
    })
    .catch(err=>{
        res.status(500).json({error:err})
    })
    router
    .put('/:id',(req,res)=>{
        const {id}=req.params
        const update = req.body
        const options ={
            new:true,
        }
        Note
        .findByIdAndUpdate(id,update,options)
        .then(response=>{
            res.status(200).json(response)
        })
        .catch(err =>{
            res.status(500).json({error:err})
        })
    })
})
module.exports = router;
