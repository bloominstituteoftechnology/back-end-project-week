import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class Home extends Component {  
    render() {
        return (
            <div className="home-wrap">
                <h1 className="home-title">Lambda Notes</h1>                
                <div className="home-links">
                    <Link to = '/register'><button>Register</button></Link>
                    <Link to = '/login'><button>Login</button></Link>
                </div>
                
            </div>            
        );
    }
}

export default Home;