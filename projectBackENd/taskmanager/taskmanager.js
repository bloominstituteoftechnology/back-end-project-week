// **CONNECTION TO OUR DB***
const knex = require('knex');
const knexConfing = require('../knexfile.js');
const db = knex(knexConfing.development);
const tbl = 'NoteTable';


// GET ALL NOTES ROUTEHANDLER

const getAllNotes =(req,res)=>{
    db(tbl).then(notes =>{
        if(notes){
            res.status(200).json(notes)
        }
        else{
            res.status(405).json({errorMessage : 'No note yet stored in the Database'})
        }})
        .catch(err =>{res.status(500).json(err)})
}

// GET A NOTE ROUTEHANDLER

const getNotebyId  =(req,res)=>{
    const {id} = req.params
    db(tbl)
    .where({id})
    .then(note => {
        if(note.length !== 0){
            res.status(200).json(note)
        }
        else{
            res.status(404).json({errorMessage :'HOOOPS NOT FOUND !!!'})
        }
        
    }).catch(err =>{res.status(500).json(err)})
}



/*
// ****Easiest route pre-test****
 const notes = [
     {
    "tags": ["tag", "otherTag"],
    "title": "Note Title",
    "textBody": "Note Body",
    }]
    const testRoute = (routename) =>{
        return(req, res) =>{
            // just for sipmle test
          res.json({notes,routename:[routename]})
    } 
    }  
  const getNotebyId = testRoute('getNotebyId') ;  
  const getAllNotes = testRoute('getAllNotes') ;    
  const CreateNewNote = testRoute('CreateNewNote') ;    
  const DestroyNote  = testRoute('DestroyNote') ;      
  const UpdateNote= testRoute(' UpdateNote') ; 
*/

module.exports = {
    getNotebyId,      
    getAllNotes,      
    //CreateNewNote,     
    //DestroyNote,       
    //UpdateNote         
    
  }