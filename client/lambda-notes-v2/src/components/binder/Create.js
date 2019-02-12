import React, {Component} from 'react';
// import {saveNewNoteToServer} from '../../actions/index';
import { connect } from 'react-redux';
import { addData } from '../../actions/index';
// import { withRouter } from 'react-router-dom';

class Create extends Component{
    constructor() {
        super();
        this.state = {
            title: '',
            content: ''
        }
    }
    render() {
        return (            
            <div>
                <h2 className="page-title">Create Note:</h2>

                <form action="" className="form">
                    <input
                        className="form-input-title"
                        name="title" 
                        value={this.state.title} 
                        placeholder="...Title"
                        type="text" 
                        onChange={this.handleInputChange}
                    />
                    <input
                        className="form-input-content"
                        name="content" 
                        value={this.state.content} 
                        placeholder="...Content"
                        type="text" 
                        onChange={this.handleInputChange}
                    />
                    <button className="button-nav hey" onClick={this.handleSubmit}>Submit</button>
                </form>

            </div>
        )
    };
    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const newNote = {
            "title": this.state.title,
            "content": this.state.content
        };
        console.log('props', this.props)
        this.props.addData(newNote);
        console.log('here', this.state);

    }//end of submit

};
const mapStateToProps = state => {
    return state;
  };
  
  export default connect(mapStateToProps, { addData })(Create);
//   export default connect(mapStateToProps, { addData })(Create);
  

// const mapStateToProps = state => {
//     console.log('state:',state);
//     return{
//         addData: state.addData
//     }
// }

// export default connect(mapStateToProps)(Create);