const db = require('./helpers/notes helper.js');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = require('./secret.js');

const authenticate =(req, res, next)=> {

  const token = req.get('Authorization');
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) return res.status(401).json(err);

      req.decoded = decoded;

      next();
    });
  } else {
    return res.status(401).json({
      error: 'No token provided, must be set on the Authorization Header',
    });
	next();
  }
};

router.get('/',authenticate,(req,res)=>{
db.find()
	.then(response => {
	res.status(200).json(response);
	})
	.catch(error => {
	res.status(500).json('internal server error');
	})
});

router.get('/:id',authenticate,(req,res)=>{
const { id } = req.params;
db.findById(id)
	.then(response => {
	res.status(200).json(response);
	})
	.catch(err => {
	res.status(500).json('internal server error')
	})
});

router.post('/',authenticate,(req,res)=>{
const { poster,title,content } = req.body;
db.add({poster,title,content})
	.then(response => {
	res.status(200).json(response);	
	})
	.catch(err => {
	res.status(500).json('internal server error')
	})
});

router.delete('/:id',authenticate,(req,res)=>{
const { id } = req.params;
db.remove(id)
	.then(response => {
	res.status(200).json(response);	
	})
	.catch(err => {
	res.status(500).json('internal server error')
	})
});

router.put('/:id',authenticate,(req,res)=>{
const { id } = req.params;
const { title,content } = req.body;
db.update(id,{title:title,content:content})
	.then(response => {
	res.status(200).json(response);	
	})
	.catch(err => {
	res.status(500).json('internal server error')
	})
});

module.exports = router;