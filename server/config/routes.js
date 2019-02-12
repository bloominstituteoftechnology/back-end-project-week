const db = require('../data/dbConfig');

module.exports = server => {
    server.get('/', test);
    server.get('/api/notes', getAllNotes);
    server.post('/api/notes', createNote);
    server.get('/api/notes/:id', getNoteById);
    server.put('/api/notes/:id', editNote);
    server.delete('/api/notes/:id', deleteNote);   
   
};

function test (req, res) {
    res.send('<h1>Rock-n-Roll!!</h1>');
};

{/*===== GET ALL notes =====*/}
function getAllNotes (req, res) {
    db('notes').then(response => {
        console.log('getAllNotes: 200 OK');
        res.status(200).json(response);
    }).catch(err => {
        console.log('getAllNotes: 500 SERVER ERROR');
        res.status(500).json(err);
    });
};

{/*===== POST CREATE note =====*/}
function createNote (req, res) {
    // console.log('myREQ.BODY:',req.body);
     const { title, content } = req.body;
     if (!title) {
         console.log('createNote: 400 BAD REQUEST');
         return res.status(400).json(['ERROR-dataShape:', {title: 'REQUIRED', content: 'OPTIONAL'}, req]).end();
     };
     const newNote = { title, content };
     db('notes')
        .insert(newNote).then(response => {
            console.log('createNote: 201 CREATED');
            res.status(201).json(
                {
                    id: response[0],
                    title: title,
                    content: content
                }
            );
        }).catch(err => {
            console.log('createNote: 500 SERVER ERROR')
            res.status(500).json(err);
        });
};

{/*===== GET note =====*/}
function getNoteById (req, res) {
    const { id } = req.params;
    db('notes').where({id:id}).then(response => {
        if (response.length === 0) {
            console.log('getNoteById: 404 NOT FOUND');
            return res.status(404).json(`ERROR: id:${id} not found!`).end();
        };
        console.log('getNoteById: 200 OK');
        res.status(200).json(response[0]);      
    }).catch(err => {
        console.log('getNoteById: 500 SERVER ERROR');
        res.status(500).json(err);
    });
};

{/*===== PUT EDIT note =====*/}
function editNote (req, res) {
    const { id } = req.params;
    const { title, content, index } = req.body;
    if (!title && !content) {
        console.log(`editNote - 418 bad request - id:${id}`);
        return res.status(418).json('ERROR: bad request from user').end();
    };
    db('notes').where({id:id})
        .then(response => {
            if (response.length === 0) {
                console.log(`editNote - 404 not found - id:${id}`);
                return res.status(404).json(`ERROR: id:${id} not found!`).end();
            };

            const userInput = { title, content };
            db('notes').where({id:id})
                .update(userInput)
                    .then(response => {
                        if (response === 1) {
                            console.log(`editNote - 200 OK - id:${id}`);

                            const makeCustomResponse = async() => {
                                
                                const getSavedRow = await db.select().from('notes').where({id:id}).then((row) => {
                                    return row[0]
                                }).catch(err => {
                                    console.log(err);
                                    res.status(205).json({
                                        message: 'Refresh page. Edit saved, unable to send back updated data.', error: err}).end();
                                    });


                                await res.status(200).json({
                                    message: `SUCCESS! - updated`,
                                    id: id,
                                    savedRow: getSavedRow,
                                    userSentIndex: index,
                                    dbResponseCode: response    
                                    }
                                );
                            }
                            makeCustomResponse();

                        } else {
                            console.log(`editNote - 501 error - id:${id}`);
                            return res.status(501).json(`ERROR: ${response} records changed`).end();
                        };
                });
        })
        .catch(err => {
            console.log(`editNote - 500 error - id:${id}`);
            res.status(500).json(err);
        });  
};


{/*===== DELETE note =====*/}
function deleteNote (req, res) {
    const { id } = req.params;
    db('notes').where({id:id}).then(response => {
        const deletedId = response[0].id;
        if (response.length === 0) {
            console.log('deleteNote: 404 NOT FOUND id:', id);
            throw new Error('id not found');
            // return res.status(404).json(`ERROR: id:${id} not found!`).end();
        };
        db('notes').where({id:id}).del().then(response => {
            console.log(`deleteNote: 202 deleted id:${id}`);
            // res.status(202).json(`SUCCESS!: deleted ${response} record (id:${id})`);
            res.status(202).json({deletedId:deletedId});
        })
    }).catch(err => {        
        res.status(404).json(err);
    }); 
};
