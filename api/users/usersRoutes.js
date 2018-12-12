const express = require('express')
const db = require('../../data/helpers/userHelpers')

const router = express()

const getUserList = async (req, res) => {
  try {
    const users = await db.getUserList();

    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({error}) 
  }
}

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await db.getUser(id);

    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({error}) 
  }
}

const postUser = async (req, res) => {
  try {
    // destructing body
    const { name, email } = req.body
    
    const newUser = {
      name,
      email
    }
    const users = await db.addUser(newUser);

    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({error}) 
  }
}

const putUser = async (req, res) => {
  try {
    const { id } = req.params
    // destructing body
    const { name, email } = req.body
    const newUser = {
      name,
      email
    }

    const users = await db.updateUser(newUser);

    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({error}) 
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const users = await db.deleteUser(id);

    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({error}) 
  }
}

const echo = (req, res) => {
  res.status(200).json({
    message: 'hey this endpoint work!',
    params: req.params,
    query: (req.query ? req.query : ''),
    body: req.body
  });
}

router.get('/', getUserList)
router.get('/:id', getUser)
router.post('/', postUser)
router.put('/:id', putUser)
router.delete('/:id', deleteUser)


module.exports = router;