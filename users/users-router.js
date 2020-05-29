const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("./users-model.js");

// no need to bring in restricted middleware because it has been applied to user router in server.js

router.get("/", (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/:id", verifyUserId, (req, res) => {
  const id = req.params.id;

  Users.findById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

	Users
		.update(req.params.id, user)
		.then((updatedUser) => res.status(200).json(updatedUser))
		.catch((err) => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
	Users
		.update(req.params.id, req.body)
		.then((updatedUser) => res.status(200).json(updatedUser))
		.catch((err) => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  Users
  .remove(req.params.id)
  .then((id) => res.status(200).json(id)).catch((err) => res.status(500).json(err));
});

// GET flashcards in a category by ID
router.get('/:id/categories', (req, res) => {
	Users
		.findCategoriesByUserID(req.params.id)
		.then((user) => res.status(200).json(user))
		.catch((error) =>
			res.status(500).json({ message: 'Could not get category #' + req.params.id + ' from server.' })
		);
});


// ---------------------- Custom Middleware ---------------------- //

function verifyUserId(req, res, next) {
  const id = req.params.id;

  Users.findById(id)
    .then(item => {
      if (item) {
        req.item = item;
        next();
      } else {
        res.status(404).json({ message: "User Not Found." });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
}

module.exports = router;