import React, { Component } from 'react';
import Form from './icons/registrationform';


class Registration extends Component {
    render() {
        return (

            <div className="main__registration">
            <div className="main__registration__header">
                    <h1>Welcome to Lambda Notes!</h1>
                    <hr className="style__one"/>
                    <h3>A free platform for those who love taking notes. Sign up now.</h3>
                    <Form />
                    </div>
            </div>

        );
    }
}

export default Registration;