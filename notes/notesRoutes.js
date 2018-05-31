const express = require('express'); 
const router = express.Router(); 
 
const Note = require('./Note'); 
 
router.route('/').get((req, res) => { 
 
	Note.find() 
		.then(notes => { 
			res.status(200).json(notes); 
		}) 
		.catch(err => { 
			res.status(500).json({ errorMessage: 'failed' }); 
		}); 
}); 
 
router.route('/:id').get((req, res) => { 
	const { id } = req.params; 
 
	Note.findById(id) 
		.then(note => { 
			if (!note) { 
				res.status(404).json({ message: 'no note' }); 
			} 
			res.status(200).json(note); 
		}) 
		.catch(err => { 
			res.status(500).json({ errorMessage: 'failed to find' }); 
		}); 
}); 
 
router.route('/').post((req, res) => { 
	if (!req.body.title || !req.body.content) { 
		res 
			.status(400) 
			.json({ errorMessage: 'no title and text' }); 
	} else { 
		const newNote = new Note(req.body); 
 
		newNote 
			.save() 
			.then(newNote => { 
				res.status(201).json(newNote); 
			}) 
			.catch(err => { 
				res.status(500).json({ 
					errorMessage: 'error saving note' 
				}); 
			}); 
	} 
}); 
 
router.route('/:id').delete((req, res) => { 
	const { id } = req.params; 

    Note.findByIdAndRemove(id)
		.then(note => { 
			if (!note) { 
				res.status(400).json({ message: 'no note' }); 
			} else { 
				res.status(204).json({ message: 'deleted' }); 
			} 
		}) 
		.catch(err => { 
			res.status(500).json({ errorMessage: 'deletion fail' }); 
		}); 
}); 
 
router.route('/:id').put((req, res) => { 
	const { id } = req.params; 
	const putted = req.body; 
 
	if (!putted.title || !putted.content) { 
		res 
			.status(400) 
			.json({ errorMessage: 'no title and text' }); 
	} else { 
		const query = Note.findByIdAndUpdate(id, putted); 
 
		query 
			.then(note => { 
				if (!note) { 
					res.status(404).json({ 
						message: 'no note' 
					}); 
				} else { 
					res.status(200).json(note); 
				} 
			}) 
			.catch(err => { 
				res 
					.status(500) 
					.json({ errorMessage: 'update failed' }); 
			}); 
	} 
}); 
 
module.exports = router; 