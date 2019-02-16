const express = require("express");
const router = express.Router();
const db = require("../data/helpers/user_helpers.js");
const protect = require("../auth/auth.js");

/*Creates a user using the information sent inside the body of the request. Hashes the password before saving the user to the database.*/
router.post("/register", (req, res) => {
   const user = req.body;
   if (user.username && user.password) {
   user.password = bcrypt.hashSync(user.password, 14);
   db.insert(user)
      .then(ids => {
         const id = ids[0];
         db.findById(id)
            .then(user => {
               if(user){
                  const token = protect.generateToken(user[0]);
                  res.status(201).json({id: ids[0], token});
               } else {
                  res.status(404).send("User not found");
               }
            })
      })
      .catch(err => {
         res.status(500).send(err);
      })
   } else  res.status(400).json({err: "please provide a username and password"});
});

/*Use the credentials sent inside the body to authenticate the user. On successful login, create a new JWT with the user id as the subject and send it back to the client.'*/
router.post("/login", (req, res) => {
   const login = req.body;
   if (login.username && login.password) {
      db.findByUsername(login.username)
         .then(users => {
            if(users.length && bcrypt.compareSync(login.password, users[0].password)) {
            const token = protect.generateToken(users[0])
            res.json({id: users[0].id, token});
             } else { res.status(404).send("Access Denied!");}
         })
         .catch(err => {
            res.status(500).send(err);
         });
   } else  res.status(400).json({err: "please provide a username and password"});
});

/*If the user is logged in, respond with an array of all the users contained in the database.*/
router.get("/", protect.auth, (req, res) => {
   db.findUsers()
      .then(users => {res.json(users)})
      .catch(err => {res.json(err)});
});

module.exports = router;