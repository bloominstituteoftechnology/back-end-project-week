import React from 'react';

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
            <button className="button__registration">Submit</button>
            <button className="button__registration">Log In</button>
        </form>
    );
};

export default Form;