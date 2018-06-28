import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './Navigation.css';

const Navigation = () => {
    return (
        <div className='navigation'>
            <Link to='/'>
                <h1>Lambda</h1>
                <h1>Notes</h1>
            </Link>
            {localStorage.getItem('jwt') ? <Link to=''><button>View Your Notes</button></Link> : <Link to='/signup'><button>Sign Up</button></Link>}
            {localStorage.getItem('jwt') ? <Link to=''><button>+ Create New Note</button></Link> : <Link to='/login'><button>Log In</button></Link>}
        </div>
    )
}

export default withRouter(connect(null)(Navigation)); 