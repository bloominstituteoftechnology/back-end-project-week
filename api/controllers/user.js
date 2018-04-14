const User = require('../models/userModels');

const createUser = (req, res) => {
   const { username, password } = req.body;
   if (username && password) {
      const newUser = new User({ username, password });
      newUser
         .save()
         .then(user => res.send(user))
         .catch(err => {
            res.status(422).send('Error saving the user');
         });
   } else {
      res.status(422).send('Please send a valid username and password');
   }
};

module.exports = createUser;
