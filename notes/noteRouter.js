const notes = require('./notes')
const router = require('express').Router()

router.get('/', (req,res) => {
    notes.find({},(err,results) => {
       
    })
})

router.post('/',(req,res) => {
    const note = req.body;
    notes.create(note,(err,result) => {
        res.status(201).json(result)
    })
})


module.exports = router;