import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 
import { connect } from 'react-redux';
import './index.css';

// we are saying whateve our redux store is set it inside our props by using this function and the prop name will be notesArray
const mapStateToProps = (state) => { 
    return {
        notesArray: state
    }
}


class NotesList extends Component {

    constructor() {
        super()
        this.state = {

        }
    }

    componentWillMount () {
        let reversed = Array.from(this.props.notesArray).reverse();
        console.log('reversed in CWM is:', reversed);
        this.setState({ notesArray: reversed })
    }
  
    //   <Link to ={'/note/' + what._id}> 

    generateNotes = (what, where) => {
        return (
            <Link to ={`/note/${what._id}`} className='unstyledLink' key={what._id}>
                <div className='note' >
                    <div>
                        <h4>{what.title}</h4>
                        <hr></hr>
                        <p>{what.body}</p>
                    </div>
                </div>
            </Link>
        )
    }


    render() {
        console.log('Props inside Notes List', this.props)
        return (
            <div className='notesList_container'>
                <div><h3 className='content-header'>Your Notes:</h3></div>
                <div className='notes_list'>
                    {this.state.notesArray.map(this.generateNotes)}             
                </div>    
            </div>
        );
    }
}

//component now has access to prop called noteArray and that prop should be an array from redux store
export default connect(mapStateToProps, {/*ActionsHere*/}) (NotesList);