const router = require('express').Router();
const Notes = require('./Notes');
const cors = require('cors');

//this is the main file I used for linking to the front end

//I moved cors here while attempting to get it to accept multiple origins. It works better here because I can put the options directly in to the get request. That seems to be the only one that needs the options right now. I hope that's not because it's not working.

const whitelist = ['http://nostalgic-kilby-8372d8.netlify.com', 'https://nostalgic-kilby-8372d8.netlify.com']
const corsOptions = {
	origin: function (origin, cb) {
		if(whitelist.indexOf(origin) !== -1) {
			cb(null, true)
		} else {
			cb(new Error('Not allowed by CORS'))
		}
	}
}

router.get('/', (req, res) => {
	Notes.find()
		.then(notes => {
			res.status(200).json(notes);
		})
		.catch(err => {
			res.status(500).json(err);
		});
	});

router.post('/',(req, res) => {
	const { title, content } = req.body
	const newNote = new Notes({ title, content });
	if (!req.body.title || !req.body.content) {
		res.status(400).json({ error: 'Please provide title and content for the note.' });
	} else {
		const { title, content } = req.body;
		newNote.save({ title, content })
			.then(notes => {
				res.status(201).json ({ notes });
			})
			.catch(err => {
				res.status(500).json({ error: 'There was an error saving the note to the database.' });
			})
		}
	});
//the POST request makes sure the note includes required fields before creating a new one

router.get('/:id', (req, res) => {
	const { id } = req.params;
	Notes.findById (req.params.id)
		.then(notes => {
			if (notes) {
				res.json ({ notes });
			} else {
				res.status(404).json({ error: 'The note with the specified ID does not exist.' });
			}
		})
		.catch(error => {
			res.status(500).json({ error: 'The note information could not be retrieved.' });
		});
	});
//I don't think I ever use this one in my front end because of the way it is written. But it would be useful if the front end was rewritten using the id numbers in the routes.

router.put('/:id', (req, res) => {
	const { title, content } = req.body;
	const id = req.params.id;

	if(!title || !content) {
		res.status(400).json({ error: 'Please provide the title and content for this note.'});
	} else {
		Notes.findByIdAndUpdate( id, { title, content } )
			.then(success => {
				if(success) {
					res.status(200);
					Notes.findById(id)
						.then(notes => {
							res.json({ notes });
					});
				} else {
					res.status(404).json({ error: 'The note with the specified id does not exist.' })
					}
				})
			.catch(error => {
				res.status(500).json({ error: 'The post could not be edited.' });
			});
		}
	});

router.delete('/:id', (req, res) => {
	const { id } = req.params
	Notes.findByIdAndRemove(id)
		.then(success => {
			if (success) {
				res.status(200).json({ message: success });
			} else {
				res.status(404).json({ error: 'The note with the specified ID does not exist.' })
			}
		})
		.catch(error => {
			res.status(500).json({ error: 'The post could not be removed.' });
		})
	});

module.exports = router;
