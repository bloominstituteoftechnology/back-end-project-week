import  React from 'react';
import './Note.css';
// import '../../public/mdhtmlform';

const EditNote = props =>{

    return (
        <div className="create-edit-form">
            <h1>Edit Note:</h1>
            <br></br>
            <textarea  type="text"
                    className="mdhtmlform-md title-input"
                    data-mdhtmlform-group="0"
                    name="title"
                    value={props.note.title}
                    onChange={props.handleInput}/>
            <br></br>
            <textarea  type="text"
                    className="mdhtmlform-md textBody-input"
                    data-mdhtmlform-group="1"
                    name="content"
                    value={props.note.content}
                    onChange={props.handleInput}/>
            <br></br>
            <button className="save-input-button"
                    onClick={
                            props.handleEditNote
                        }>Save</button>
        </div>
      
    )
}

export default EditNote;