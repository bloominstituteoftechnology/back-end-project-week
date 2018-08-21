import React, { Component } from 'react';
import { connect } from 'react-redux';


// const Edit = (props) => {
//     return(
//         <h1>Edit</h1>
//     )
// }
// export default Edit;
class Edit extends Component {
    constructor(props) {
        super(props); 
        this.state = { editNote: {   
                id: '99', 
                title: 'hey', 
                content: 'you'
            } 
        }       
    }        
    render() {
        // console.log(this.props)
        const id = this.props.match.params.id;
        this.props.notes.map((note) => {
            if (note.id == id) {
                // console.log(note);
                console.log(this.state.editNote.id);
            }
        })
        return(
            <h1>Edit</h1>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        notes: state.notes
    }
}
export default connect(mapStateToProps)(Edit);