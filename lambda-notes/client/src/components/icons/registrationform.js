import React from 'react';
import { Link } from 'react-router-dom';

const Form = () => {
    return (
        <form>
            <p className="p__shift">First Name:</p>

            <input type="text" name="firstname" />

            <p className="p__shift">Last Name:</p>

            <input type="text" name="lastname"/>

            <p className="p__shift">Username:</p>

            <input type="text" name="lastname"/>

            <p className="p__shift">Password:</p>

            <input type="text" name="lastname"/>

            <br />
            <Link to='/user'><button className="button__registration">Submit</button></Link>
            <button className="button__registration">Log In</button>
        </form>
    );
};

export default Form;