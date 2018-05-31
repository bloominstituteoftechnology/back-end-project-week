import React from "react";
import "react-confirm-alert/src/react-confirm-alert.css";

import axios from 'axios';

const Delete = props => {
    const id = props.match.params.id;

    axios.delete(`https://boiling-wildwood-28100.herokuapp.com/delete/${id}`)
        .then(resp => props.update())
        .catch(err => console.log('delete inside', err))


    return (
        <div className="delete">
            <p>Note deleted</p>
            <div className="delete-btns">
                <a href='/'>
                    <button className="deleteBtn"> click to return to root</button>
                </a>
            </div>
        </div>
    );



}

export default Delete;  