/*const Note=require('./noteModel');




//delete a note
.delete ((req,res)) =>
const { id }=req.params
Note.findByIdAndRemove(id)
.then (response => {
	res.status(200).json(response;
	})
.catch(err =>
	res
	.status(500)
	.json({errorMessage: 'The note could not be removed'})
})

*/