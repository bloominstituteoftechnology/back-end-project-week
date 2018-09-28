import React, { Component } from 'react';
import './index.css';
import { Link } from 'react-router-dom';


class LeftNav extends Component {
    render() {
        return (
            <div className="nav_container">
                <Link to="/notes" style={{ textDecoration: 'none' }}>
                    <h4 className="title">Lambda Notes</h4>
                </Link>
                <Link to="/notes">
                    <button>View Your Notes</button>
                </Link>
                <Link to="/create">
                    <button>+ Create New Note</button>
                </Link>
                <Link to="/login" onClick={this.logout}>
                    <div className="signin">
                        signin|out
                    </div>
                </Link>
            </div>
        )
    }

    logout = event => {
        localStorage.removeItem('jwt');
    }
}

export default LeftNav;