import React from 'react';
import { Link } from 'react-router-dom'

const Delete = () => {
        return (
<div className="section__delete">
                <p className="delete__p">Are you sure you want to delete this?</p>
                <button className="button__delete"><Link className="link" to='/user'>Delete</Link></button>
                <button className="button__save"><Link className="link" to='/view'>Save</Link></button>
      
            </div>
        );
}
export default Delete;