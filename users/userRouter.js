const users = require('./users');
const router = require('express').Router();


router.get('/', (req,res) => {
    res.status(200).json({message:'user Router up'})
})

router.get('/:id', (req,res)=>{
    users.findById(req.params.id,(err,results) => {
        if (err) {
            res.send(err)
        }
        res.status(200).json(results)
    })
})

//Create user 
router.post('/', (req,res) => {
    const user = req.body;
    users.create(user, (err,result) => {
        if(err){
            res.send(err)
        }
        res.json(result)
    })
})

module.exports = router; 