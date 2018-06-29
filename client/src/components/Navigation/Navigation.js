import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import './Navigation.css';

class Navigation extends Component {
    render() {
        return (
            <div className='navigation'>
                {localStorage.getItem('jwt') ? <Link to={`/${localStorage.getItem('userId')}`}><h1>Lambda</h1><h1>Notes</h1></Link> : <Link to='/'><h1>Lambda</h1><h1>Notes</h1></Link>}
                {localStorage.getItem('jwt') ? <Link to={`/${localStorage.getItem('userId')}`}><button>View Your Notes</button></Link> : <Link to='/signup'><button>Sign Up</button></Link>}
                {localStorage.getItem('jwt') ? <Link to={`/${localStorage.getItem('userId')}/createnote`}><button>+ Create New Note</button></Link> : <Link to='/login'><button>Log In</button></Link>}
            </div>
        )
    }
}

export default withRouter(Navigation); 