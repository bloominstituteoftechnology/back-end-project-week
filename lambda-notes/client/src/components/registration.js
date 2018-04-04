import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Registration extends Component {
    render() {
        return (

            <div className="main__registration">
                <div className="main__registration__header">
                    <h1>Welcome to Lambda Notes!</h1>
                    <hr className="style__one" />
                    <h3>A free platform for those who love taking notes. Sign up now.</h3>
                    <form>
                        <p className="p__shift">First Name:</p>

                        <input type="text" name="firstname" />

                        <p className="p__shift">Last Name:</p>

                        <input type="text" name="lastname" />

                        <p className="p__shift">Username:</p>

                        <input type="text" name="lastname" />

                        <p className="p__shift">Password:</p>

                        <input type="text" name="lastname" />

                        <br />
                        <Link to='/user'><button className="button__registration">Submit</button></Link>
                        <button className="button__registration">Log In</button>
                    </form>
                </div>
            </div>

        );
    }
}

export default Registration;