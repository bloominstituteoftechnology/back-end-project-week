// const express = require('express');
// const bodyParser = require('body-parser');
// const Joi = require("joi");
// const knex = require('./database/db');
// const helmet = require('helmet');
// const cors = require('cors');
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const port = 8000;


// const server = express();
// server.use(express.json());
// server.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true
// }));

// // Database setup using knex
// const dbConfig = require("./knexfile");
// const db = knex(dbConfig.development);

const express = require('express');
const server = express();
const cors = require('cors');

const db = require("./database/db")

server.use(express.json());
server.use(cors());

const port = 8000;

// // Function generating unique Web Token for each user
// const secret =
//   "A man who wants to lead the orchestra must turn his back on the crowd and do what he thinks is right";
// const generateToken = username => {
//   const payload = {
//     username
//   };
//   const options = {
//     expiresIn: "3hr",
//     jwtid: "14869046"
//   };

//   return jwt.sign(payload, secret, options);
// };

// // Validation of request body FOR NoteS using Joi
// const validateNoteBody = body => {
//   const schema = {
//     title: Joi.string()
//       .min(3)
//       .max(35)
//       .required(),
//     content: Joi.string()
//       .min(3)
//       .required(), 
//     tags: Joi.string() 
//   };
//   return Joi.validate(body, schema);
// };

// // Validation of request body FOR REGISTRATION/LOGIN using Joi
// const validateUserBody = body => {
//   const schema = {
//     username: Joi.string()
//       .min(3)
//       .required(),
//     password: Joi.string()
//       .min(6)
//       .required()
//   };
//   return Joi.validate(body, schema);
// };

// // Middleware that only allows users with permission to access endpoints
// function protected(req, res, next) {
//   const token = req.headers.authorization;
//   if (token) {
//     jwt.verify(token, secret, (err, decodedToken) => {
//       if (err) {
//         res.status(401).json({ Error: "Invalid Token" });
//       } else {
//         req.user = { username: decodedToken.username };
//         next();
//       }
//     });
//   } else {
//     res.status(401).json({ message: "No token was provided" });
//   }
// }

// server.post("/api_v1/register", (req, res) => {
//   const body = req.body;

//   // validation called using Joi
//   const validated = validateUserBody(body);
//   if (validated.error) {
//     res.status(400).json(validated.error.details[0].message);
//   }

//   //hash the password before sending to database
//   const hash = bcrypt.hashSync(body.password, 13);
//   body.password = hash;
// const id = 9;
//   knex("users")
//     .insert(body)
//     .then(id => {
//       const token = generateToken(body.username);
//       res.status(201).json({ id, token });
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ Error: "Error updating user information in database" });
//     });
// });

// server.post("/api_v1/login", (req, res) => {
//   const body = req.body;

//   //Validate body using Joi
//   const validated = validateUserBody(body);
//   if (validated.error) {
//     res.status(400).json(validated.error.details[0].message);
//   }

//   knex("users")
//     .where({ username: body.username })
//     .first()
//     .then(user => {
//       // compare password in body to password in database
//       if (user && bcrypt.compareSync(body.password, user.password)) {
//         const token = generateToken(body.username);
//         res.status(201).json({ message: "Successfully logged in!", token });
//       } else {
//         res.status(404).json({
//           message: "Sorry your credentials are incorrect, please try again"
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).json({ Error: "Error accessing data from the database" });
//     });
// });







/* Begin Notes Manipulation */
server.get('/', (req, res) => {

  res.send('Authentication: <h1>Backend Project Week</h1> <h3>Sam Khaled</h3>');
});

// server.get('/api_v1/users', (req, res) => {
// 	knex('users')
// 		.then(users => {
// 			res.status(200).json(users);
// 		})
// 		.catch(error => {
// 			res.status(500).json(error);
// 		})
// });
//  server.get('/api_v1/users/:id', (req, res) => {
// 	const { id } = req.params;
//  	knex('users').where({ id })
// 		.then(user => {
// 			if (user.length > 0) {
// 				res.status(200).json(user);
// 			} else {
// 				res.status(404).json({message: 'User does not exist'});
// 			}
// 		})
// 		.catch(error => {
// 			res.status(500).json(error);
// 		})
// });

// server.get('/api_v1/users/:id/notes', protected, (req, res) => {
// 	const { id } = req.params;
//  	knex('Notes').where('userId', id)
// 		.then(Notes => {
// 			if (Notes.length > 0) {
// 				res.status(200).json(Notes);
// 			} else {
// 				res.status(404).json({message: 'User does not exist'});
// 			}
// 		})
// 		.catch(error => {
// 			res.status(500).json(error);
// 		})
// });

// server.get('/api_v1/notes', protected, (req, res) => {
// 	knex('Notes')
// 		.then(Notes => {
// 			res.status(200).json(Notes);
// 		})
// 		.catch(error => {
// 			res.status(500).json({ error: "Error fetching the data from the database" });
// 		})
// });

// server.get('/api_v1/tags', protected, (req, res) => {
// 	knex('tags')
// 		.then(tags => {
// 			res.status(200).json(tags);
// 		})
// 		.catch(error => {
// 			res.status(500).json(error);
// 		})
// });

// server.get('/api_v1/tags/:id', protected, (req, res) => {
// 	const { id } = req.params;
//  	knex('tags').where({ id })
// 		.then(tag => {
// 			res.status(200).json(tag);
// 		})
// 		.catch(error => {
// 			res.status(500).json(error);
// 		})
// });

// // add a [GET] /Notes/:id/tags endpoint will returns all tags for the Note with the specified id.
// server.get('/api_v1/notes/:id/tags', protected, (req, res) => {
// 	const { id } = req.params;
// 	knex('notes_tags').where({NoteId: id})
// 		.join('tags', 'notes_tags.tagId', '=', 'tags.id')
// 		.select('noteId', 'tag')
// 		.then(tags => {
// 			res.status(200).json(tags);
// 		})
// 		.catch(error => {
// 			res.status(500).json(error);
// 		})
// })
// // [GET] /Notes/:id/tags endpoint that returns all tags for the Note with the specified id.
// server.get('/api_v1/notes_tags', protected, (req, res) => {
// 	knex('notes_tags')
// 		.then(data => {
// 			res.status(200).json(data);
// 		})
// 		.catch(error => {
// 			res.status(500).json(error);
// 		})
// });

// // [GET] /Notes/:id endpoint include the user name(not the id) and the tags associated with the Note.
// server.get('/api_v1/notes/:id', protected, (req, res) => {
// 	const { id } = req.params;
//  	knex('notes_tags').where({ NoteId: id })
// 		.join('tags', 'tags.id', '=', 'notes_tags.tagId')
// 		.join('notes', 'notes.id', '=', 'notes_tags.NoteId')
// 		.join('users', 'users.id', '=', 'notes.userId')
// 		.select('name', 'tag')
// 			.then(data => {
// 				res.status(200).json(data);
// 			})
// 			.catch(error => {
// 				res.status(500).json(error);
// 			})
// });

// server.post('/api_v1/users', protected, (req, res) => {
// 	const { name } = req.body;
// 	if (!name) {
// 		res.status(404).json({ message: 'Must provide user\'s name.'});
// 	} else {
// 		knex('users')
// 			.insert({ name })
// 			.then(data => {
// 				res.status(200).json(data);
// 			})
// 			.catch(err => {
// 				res.status(500).json(err);
// 			});
// 	}
// });

// server.post('/api_v1/notes', protected, (req, res) => {
// 	const { userId, text } = req.body;
// 	if (!userId || !text) {
// 		res.status(404).json({message: 'Provide both userId and text.'});
// 	} else {
// 		knex('notes').insert(req.body)
// 			.then(() => {
// 				res.status(201).json({message: 'Successfully added a new Note.'})
// 			})
// 			.catch(error => {
// 				res.status(500).json(error);
// 			});
// 	}
// });

// server.post('/api_v1/tags', protected, (req, res) => {
// 	const { tag } = req.body;
//  	if (!tag) {
// 		res.status(404).json({message: 'Please provide tag.'});
// 	} else {
// 		knex('tags').insert(req.body)
// 			.then(() => {
// 				res.status(201).json({message: 'Successfully added a new tag.'});
// 			})
// 			.catch(error => {
// 				res.status(500).json(error);
// 			})
// 	}
// });

// server.put('/api_v1/users/:id', protected, (req, res) => {
// 	const { id } = req.params;
// 	const user = req.body;
//  	knex('users').where({ id }).update(user)
// 		.then(user => {
// 			if (!user) {
// 				res.status(404).json({message: 'User does not exist'});
// 			} else {
// 				res.status(200).json({message: 'User updated successfully'});
// 			}
// 		})
// 		.catch(error => {
// 			res.status(500).json(error);
// 		})
// });

// server.put('/api_v1/notes/:id', protected, (req, res) => {
// 	const { id } = req.params;
// 	const newNote = req.body;
// 	if (!id) {
// 		res.status(404).json({message: 'Please provide an id.'});
// 	} else if (!newNote) {
// 		res.status(404).json({message: 'Please provide updated information.'});
// 	} else {
// 		knex('notes').where({ id }).update(newNote)
// 			.then(() => {
// 				res.status(201).json({message: 'Successfully updated Note.'})
// 			})
// 			.catch(error => {
// 				res.status(500).json(error);
// 			})
// 	}
// });

// server.put('/api_v1/tags/:id', protected, (req, res) => {
// 	const { id } = req.params;
// 	const updatedTag = req.body;
//  	if (!updatedTag) {
// 		res.status(404).json({message: 'Please provide a tag.'});
// 	} else {
// 		knex('tags').where({ id }).update(updatedTag)
// 			.then(() => {
// 				res.status(201).json({message: 'Tag successfully updated'});
// 			})
// 			.catch(error => {
// 				res.status(500).json(error);
// 			})
// 	}
// });
// server.delete('/api_v1/users/:id', protected, (req, res) => {
// 	const { id } = req.params;
//  	knex('users').where({ id }).del()
// 		.then(() => {
// 			res.status(200).json({message: 'User deleted successfully'});
// 		})
// 		.catch(error => {
// 			res.status(500).json(error);
// 		})
// });

// server.delete('/api_v1/notes/:id', protected, (req, res) => {
// 	const { id } = req.params;
// 	knex('notes').where({ id }).del()
// 		.then(() => {
// 			res.status(201).json({message: 'Successfully deleted Note.'});
// 		})
// 		.catch(error => {
// 			res.status(500).json(error);
// 		})
// })

// server.delete('/api_v1/tags/:id', protected, (req, res) => {
// 	const { id } = req.params;
//  	knex('tags').where({ id }).del()
// 		.then(() => {
// 			res.status(201).json({message: 'Tag successfully deleted.'});
// 		})
// 		.catch(error => {
// 			res.status(500).json(error);
// 		})
// });


//Get all notes
server.get('/api_v1/notes', (req, res) => {
  db.select().from('notes')
  .then(response => {
    res.status(200).json({"Message": response});
  })
  .catch(error => {
   res.status(500).send({ error: "Server Error" })
  })
});

//Get note by id
server.get("/api_v1/notes/:id", (req, res) => {
  const { id } = req.params;
  db.select().from('notes').where('id', id)
    .then(response => {
      res.status(200).json({"Message": response});
    })
    .catch(response => {
      res.status(500).send({ error: "Server Error" });
    })
  });

//Create new note
server.post("/api_v1/notes", (req, res) => {
  const { title, content } = req.body;
  if(!title || !content){
    res.status(422).json({"Message": "Need title/content"})
  }
  else {
  db.insert({"title": title,
              "content" : content})
              .into('notes')
    .then(response => (res.status(200).json(response)))
    .catch(error => {
     res.status(500).send({ error: "Server Error" })
   })}
});

//edit existing note
server.put("/api_v1/notes/:id", (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    if(!title || !content){
      res.status(422).json({"Message": "Need title/content"})
    }
    else {
      db.update({
                  "title": title,
                  "content": content,
                }).into('notes').where('id', id)
        .then(response => (res.status(200).json(response)))
        .catch(error => {
         res.status(500).send({ error: "Server Error" })
       })
    }
});

//delete note
server.delete("/api_v1/notes/:id", (req, res) => {
  const { id } = req.params
  db('notes').where("id", id).delete()
    .then(response => (res.status(200).json(response)))
    .catch(error => {
     res.status(500).send({ error: "Server Error" })
   })
});
/* End Notes Manipulation */

// server.listen(port, () => console.log(`\n Server is running on http://localhost:${port} === \n`));
server.listen(port, function() {
	console.log(`\n Server is running on http://localhost:${port} === \n`);
});