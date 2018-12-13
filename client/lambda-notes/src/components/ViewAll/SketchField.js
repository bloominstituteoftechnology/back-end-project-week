import {SketchField, Tools} from 'react-sketch';
import React from 'react';

class SketchFieldDemo extends React.Component {
     render() {
        return (
            <SketchField width='1024px' 
                         height='768px' 
                         tool={Tools.Pencil} 
                         lineColor='black'
                         lineWidth={3}/>
        )
     }
}

export default SketchFieldDemo;