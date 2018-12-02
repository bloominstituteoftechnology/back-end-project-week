const notes = require('./notes')
const router = require('express').Router()

router.get('/', (req,res) => {
    notes.find({},(err,results) => {
       res.status(200).json(results)
    })
})

router.get('/:id', (req,res) => {
    notes.findById(req.params.id,(err,result) => {
        res.status(200).json(result)
    })
})

router.post('/',(req,res) => {
    const note = req.body;
    notes.create(note,(err,result) => {
        res.status(201).json(result)
    })
})
router.put('/:id',(req,res) => {
    notes.findByIdAndUpdate(req.params.id,req.body,(err,result) => {
        res.status(200).json(result)
    })
})

router.delete('/:id',(req,res) => {
    notes.findByIdAndRemove(req.params.id,(err,result) => {
        res.status(200).json(result)
    })
})


module.exports = router;
