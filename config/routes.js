const bcrypt = require('bcryptjs');

const { authenticate, generateToken } = require('./middlewares.js');

const db = require('../database/dbConfig.js');

module.exports = server => {
    server.get('/', serverRunning);
    server.get('/api/notes',/* authenticate, */ getNotes); //Display a list of notes.
    server.get('/api/notes/:id', viewSingleNote);//View an existing note.
    server.post('/api/notes', createNote) //Create a note with a title and content
    server.put('/api/notes/:id', updateNote);//Edit an existing note.
    server.delete('/api/notes/:id', deleteNote);//Delete an existing note.

    server.post('/api/register', register);
    server.post('/api/login', login);
}


//======= FUNCTION TO SEE SERVER RUNNING ON BASIC ROUTE '/' ========
function serverRunning(req, res) {
    res.send('Server is ON.......NOTES');
}

//======= FUNCTION TO SEE ALL NOTES ROUTE '/api/notes' ========
function getNotes(req, res) {
    db('notes')
            .then(notes => {
                res.status(200).json(notes);   
             })
            .catch(error => {
                response.status(500).json({error : 'The notes data could not be retrieved'})
            })
}


//===== NOTES GET BY ID ROUTE '/api/notes/:id' ============
function viewSingleNote(req, res) {
    db('notes')
             .where({id : req.params.id})
             .then(note => {
                    res.status(200).json(note); 
              })
             .catch(error => {
                    res.status(500).json({error : 'The data could not be retrieved'})
              }) 
}

//===== POST to create new note ROUTE '/api/notes' ============
function createNote(req, res) {
    if(req.body) {
        db('notes')
                .insert(req.body)
                .then(id => {
                        res.status(201).json(id);
                 })
                .catch(error => {
                        res.status(500).json({message : 'error creating note',error});
                 })
    } else {
        res.status(422).json({message : 'Need correct data to create note..'})
    }
}
  
//===== DELETE note according to id ROUTE '/api/notes/:id' ============
function deleteNote(req, res) {
        db('notes')
             .where({id : req.params.id})
             .delete(req.params.id)
             .then(count => {
                count ? res.status(200).json({ message: "note successfully deleted." })
                      : res.status(404).json({ message: "The project with the specified ID does not exist."})
              })
             .catch(error => {
                    res.status(500).json({message : 'error deleting user'})
              })
}

//===== UPDATE note according to id ROUTE '/api/notes/:id' ============
const updateNote = (req, res) => {
    if(req.body) {
        db('notes')
             .where({id : req.params.id})
             .update(req.body)
             .then(count => {
                    if(count) {
                        res.status(200).json(count);
                    } else {
                        res.status(404).json({ message: "The project with the specified ID does not exist." })
                    }
              })
             .catch(error => {
                    res.status(500).json({ error: "The project information could not be modified." })
              })
    } else {
          res.status(422).json({error : "Need correct data..."})
    }
}

//USERS REGISTER  and  LOGIN 
//======= FUNCTION TO SEE REGISTER NEW USERE '/api/register' ========
function register(req, res) {
    // implement user registration
    const credentials = req.body;
    
    const hash = bcrypt.hashSync(credentials.password, 6);
    credentials.password = hash;
    db('users').insert(credentials)
               .then(ids => {
                    res.status(201).json(ids);
                })
               .catch(err => res.send(err));
}

//======= FUNCTION LOGIN ========
function login(req, res) {
    // implement user login
    const credentials = req.body;
    db('users')
          .where({ username : credentials.username })
          .first()
          .then(user => {
              if(user && bcrypt.compareSync(credentials.password, user.password)) {
                    const token = generateToken(user);
                    res.status(200).json({message : "Logged In", token});
              } else {
                    res.status(401).json({message : "Invalid username or password.."})
              }
           })
          .catch(err => res.send({Message : "Error in Logging In..."}));
}
