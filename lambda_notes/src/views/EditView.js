import React from 'react';
import {connect} from 'react-redux';
import EditNote from '../components/EditNote';
import {editNote}  from '../store/actions';

class EditView extends React.Component {
    constructor(props){
        super(props);
        this.state={
            note:{ ...this.props.noteOnProps
            }
        }
    }

    handleInput = event =>{
        event.preventDefault();
        this.setState({ ...this.state,
                        note:{...this.state.note, [event.target.name]: event.target.value}});
    }

    handleEditNote = event => {
        event.preventDefault();
        this.props.editNote(this.state.note);
        this.props.history.push("/");
    }

    render(){
        return (
            <div className="create-view-container">
                <EditNote {...this.props}
                            note={this.state.note}
                            handleInput={this.handleInput}
                            handleEditNote={this.handleEditNote} />

            </div>
    )}      
}

const mapStateToProps = state => ({
    noteOnProps: state.note
});

export default connect( mapStateToProps,
                        {editNote
                        })(EditView);