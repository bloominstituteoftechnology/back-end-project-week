
 const notes = [
     {
    "tags": ["tag", "otherTag"],
    "title": "Note Title",
    "textBody": "Note Body",
    }]
    const testRoute = () =>{
        return(req, res) =>{
            // just for sipmle test
          res.json({notes})
    } 
    }  
  const getNotebyId = testRoute('getNotebyId') ;  
  const getAllNotes = testRoute('getAllNotes') ;    
  const CreateNewNote = testRoute('CreateNewNote') ;    
  const DestroyNote  = testRoute('DestroyNote') ;      
  const UpdateNote= testRoute(' UpdateNote') ; 


module.exports = {
    getNotebyId,      
    getAllNotes,      
    CreateNewNote,     
    DestroyNote,       
    UpdateNote         
    
  }