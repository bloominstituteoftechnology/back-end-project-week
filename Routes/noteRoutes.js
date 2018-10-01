const express = require('express');
const router = express.Router();
const db = require('../data/helpers/notesDb');
const multer = require('multer');
const upload = multer({ dest: __dirname + '/files/' });
const fs = require('fs');
const cloudinary = require('cloudinary');

cloudinary.config({ 
  cloud_name: 'dvgfmipda', 
  api_key: '682433638449357', 
  api_secret: 'XCwRt4rmt3a6-Jc06bzwSRhv3ns' 
});







router.get('/', (req,res) => {
        const request = db.get();

        request.then(response => {
        res.status(200).json(response);
        })

        .catch(error => {
        res.status(500).json({error: "Failed to retrieve notes"});
        })
});

router.get('/:id', (req,res)=>{
        const id = req.params.id;

        const request = db.getById(id);

        request.then(response => {
        console.log(response);

        if(response.length==0) {
                res.status(404).json({ error: "The note with the specified Id does not exist." });
        }
        else {
                console.log(response);
                res.status(200).json(response);
        }
        })

        .catch(error => {
        res.status(500).json({error: "Failed to retrieve the note."});
        })
});

router.get('/search/:search', (req, res) => {
        const search = req.params.search;
        console.log(search);
        const request = db.getByTitle(search);

        request.then(response => {

                console.log(response);
                res.status(200).json(response);
        })

        .catch(error => {
        res.status(500).json({error: "Failed to retrieve the notes."});
        })


});


router.post('/', upload.single('file'),(req,res)=> {
	console.log(req.file);

        const title = req.body.title;
        const content = req.body.content;
	let imgUrl="";

	cloudinary.uploader.upload(req.file.path,(result) =>{ 
		console.log(result);
		imgUrl = result.secure_url;
		return imgUrl
	}).then(() =>{
	
  	//stream = cloudinary.uploader.upload_stream((result)=>{
    	//	console.log("hi",result);
    	//	res.send('Done:<br/> <img src="' + result.url + '"/><br/>' +
          //   	cloudinary.image(result.public_id, { format: "png", width: 100, height: 130, crop: "fill" }));
  //}, { public_id: req.body.title } );

  //fs.createReadStream(req.file.path, {encoding: 'binary'}).on('data', stream.write).on('end', stream.end);


	//console.log(req.body);
	console.log(imgUrl);
	const image=imgUrl;	
        const note = {title, content, image};

        if(!title || !content){
                res.status(400).json({error: "Failed to save note to the database. Please provide title and content for the note."});
        }

	else{

        const request = db.insert(note);

        request.then(response => {
		console.log(response);
		let r = response;
                res.status(200).send(r);
        })

        .catch(error => {
        res.status(500).json({error: "Failed to save note to the database" });
        })

        }
	})
		
});

router.put('/:id', (req, res) => {
        const id = req.params.id;

        const title = req.body.title;
        const content = req.body.content;

        console.log(id);
        console.log(req.body);

        if(!title || !content){
        res.status(400).json({error: "Failed to update note to the database. Please provide title and content for the note."});
        }

        else{
        const note = {title, content};

        const request= db.update(id, note);

        request.then(response => {
        response = note;

        res.status(200).json(response);
        })

        .catch(error => {
        res.status(500).json({error: "Failed to update the note"});
        })

        }
});


router.delete('/:id', (req, res) => {
        const {id} = req.params;

        const request = db.remove(id);

        request.then(response => {
        res.status(200).json(response);
        })

        .catch(error => {
        res.status(500).json({error: "Failed to delete note"});
        })

});

module.exports = router;
