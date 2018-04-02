import React, { Component } from 'react';
import Form from './icons/form';


class Registration extends Component {
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
                            <img src="https://png.icons8.com/metro/1600/note.png" />
                            <h1>Welcome to Lambda Notes.</h1>
                            <h3>A free platform for those who love taking notes. Sign up now.</h3>
                            <Form />
                        </div>
                    </div>
                </div>

        );
    }
}

export default Registration;