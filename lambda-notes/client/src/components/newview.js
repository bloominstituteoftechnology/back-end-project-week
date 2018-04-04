import React, { Component } from 'react';

class NewView extends Component {

    render() {
        return (
            <div>
                <div className="section__content__left">
                    <h1 className="title">Lambda Notes</h1>
                    <button className="button__main">View Your Notes</button>
                    <br />
                   <button className="button__main">+ Create New Note</button>

                </div>
                <div className="main">
                     <div className="main__list">
                         <h3 className="title__main">Your Notes:</h3>
                       Testing
                    </div>
                </div>
            </div>
        );
    }
}

export default NewView;