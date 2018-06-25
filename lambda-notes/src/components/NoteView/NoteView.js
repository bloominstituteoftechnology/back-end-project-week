import React, { Component } from 'react';
import DeleteNote from '../DeleteNote/DeleteNote'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './index.css';

// we are saying whatever our redux store's state is, set it inside our props by using this function and the prop name will be notesArray
const mapStateToProps = (state) => { 
    return {
        notesArray: state
    }
}

class NoteView extends Component {
    constructor() {
        super()
        this.state = {
            matched: [],
            displayDelete: false,  
        }
    }

    componentWillMount() {
        let routeId = this.props.match.params.id;
        // console.log('Route id is: ', routeId)
        let matched = this.props.notesArray.filter((item) => item._id === routeId);
        // console.log('Matched object', matched)
        this.setState({ matched }) //({matched: matched}) // You don't have to do that if the property name is the same as the property value 
    }

    showModal = () => {
        this.setState({ displayDelete: !this.state.displayDelete });
    }

    render() {
        // console.log('NoteView Props', this.props)
        return (
            <div className='noteView_container'>
                <div className='noteView_topContent'>
                    <h3 className='content_header'>
                    {this.state.matched[0].title}
                    </h3>
                    <div>
                        <Link to ={`/edit/${this.props.match.params.id}`}
                         className='edit_delete'
                         >edit
                         </Link>
                        <a href='#'
                         className='edit_delete'
                         onClick={this.showModal}
                         >delete
                         </a>
                    </div> 
                </div>
                <div className='notesList'>
                    <p className=''>
                        {this.state.matched[0].body}
                    </p>
                </div>
                <DeleteNote
                 toggle={this.state.displayDelete}
                 showModal={this.showModal}
                 toDelete ={this.state.matched[0]._id}
                 history = {this.props.history} />
            </div>
        );
    }
}

//component now has access to prop called noteArray and that prop should be an array from redux store
export default connect(mapStateToProps, {/*ActionsHere*/}) (NoteView);
