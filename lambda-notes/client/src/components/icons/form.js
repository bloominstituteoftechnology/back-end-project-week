import React from 'react';

const Form = () => {
    return (
        <form>
            <p>First Name:</p>
            <br />
            <input type="text" name="firstname" value="Mickey" />
            <p>Last Name:</p>
            <br />
            <input type="text" name="lastname" value="Mouse" />
            <br />
            <button>Submit</button>
        </form>
    );
};

export default Form;