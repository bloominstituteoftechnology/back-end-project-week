import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default class DeleteNote extends Component {
    render() {
        let toggle = this.props.toggle;
        return (
            <div className={toggle ? 'deleteContainer' : 'hidden'}>
                <div>
                    <span>Are you sure you want to delete this?</span>
                </div>
                <div className='deleteButtons'>
                <Link to='/'>
                    <button onClick={this.props.delete}>
                        <strong>Delete</strong>
                    </button>
                </Link>
                    <button onClick={this.props.updateStatus}><strong>No</strong></button>
                </div>
            </div>
        )
    }
}