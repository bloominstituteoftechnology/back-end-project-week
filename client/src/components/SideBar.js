import React from 'react';
import { Link } from 'react-router-dom';

class SideBar extends React.Component {

render(){
    return(
        <div className="side-bar">
            <h1>Lambda</h1>
            <h1>Notes</h1>
            <Link to='/' className="button"><h4>View Notes</h4></Link>
            <Link to='/new-note' className="button"><h4>+ Create a Note</h4></Link>
        </div>
    )
}
}

export default SideBar;