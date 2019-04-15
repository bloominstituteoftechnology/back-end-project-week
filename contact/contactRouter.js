const router = require("express").Router();
const Contact = require("./Contact")
//const mongoose = require("mongoose");

//Borrowing from notes backend: I didn't want to create a separate backend for my portfolio site's 
// contact form, so am using notes app's backend for that functionality.
router.post("/contact", (req, res) => {
    const newContact = { name, email, message } = req.body;  
  Contact.create(newContact)
    .then(contact => {
      res.status(201).json(contact);
    })
    .catch(err => {
       console.log("We have an error", err)
      res.status(500).json(err.message);
    });
});

module.exports = router;
