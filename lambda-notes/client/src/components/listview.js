import React, { Component } from 'react';
import NoteList from './notelist';
import { Link } from 'react-router-dom';
class ListView extends Component {
    
    render() {
        return (
            <div>
                <div className="section__content__left">
                    <h1 className="title">Lambda Notes</h1>
                    <button className="button__main"><Link className="link" to='/user'>View Your Notes</Link></button>
                    <br />
                   <button className="button__main"><Link className="link" to='/create'>+ Create New Note</Link></button>

                </div>
                <div className="main">
                     <div className="main__list">
                         <h3 className="title__main">Your Notes:</h3>
                         <div>
                         <NoteList/>
                         </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListView;