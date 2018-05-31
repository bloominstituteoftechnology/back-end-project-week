import React from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";
import axios from 'axios'; 

const Delete = props => {
const id = props.match.params.id;

    axios.delete(`https://boiling-wildwood-28100.herokuapp.com/delete/${id}`)
        .then(resp => props.update())
        .catch(err => console.log('delete inside',err))

    const handleDelete = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="delete">
                        <p>Are you sure You want to delete this note?</p>
                        <div className="delete-btns">
                        <a href ='/'>
                                <button className="deleteBtn"> Delete</button>

                            <button className="noBtn">No</button>
                        </a>
                        </div>
                    </div>
                );
            }
        });
    };

    return (<div>{handleDelete()}</div>)
}

export default Delete;  