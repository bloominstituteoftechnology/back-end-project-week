const router = require("express").Router();
const Contact = require("./Contact")
router.post((req, res) => {
  const newContact = ({ name, email, message } = req.body);
  Contact.create(newContact)
    .then(contact => {
      res.status(201).json(contact);
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

module.exports = router;
