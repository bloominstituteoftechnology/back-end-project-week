import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MappedItem extends Component {
  
    render() { 
        console.log('this props in a mapped note: ', this.props)
        return ( 
            
                <div className='singleNote'>
                    <Link to={`note/get/${this.props.item.id}`} className='linksNotes'>
                    <h3 className='headings noteTitle'>{this.props.item.title}</h3>
                    <hr />
                    <p className='noteBody'>{this.props.item.content}</p>
                    </Link>
                </div>
            
         );
    }
}
 
export default MappedItem;