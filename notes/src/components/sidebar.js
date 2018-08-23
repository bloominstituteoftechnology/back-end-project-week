import React, { Component } from 'react';

import axios from 'axios';
import {Route, Link} from 'react-router-dom';

class Sidebar extends Component {
    render() {
        return (
            <div className='sidecontainer'>
<h1> Lambda Notes </h1>
<Link to ='/'>
<button className='viewnotes'> View Notes </button>
</Link>

<Link to ='/addnote'>
<button className='addanotebutton'> +Add a Note </button>
</Link>

    </div>
        )
    }
}
export default Sidebar;