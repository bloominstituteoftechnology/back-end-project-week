import React, { Component } from 'react';
import './index.css';
import DeleteNote from '../DeleteNote/DeleteNote';
import { Link } from 'react-router-dom';


class NoteView extends Component {

    constructor(){
        super();
        this.state = {
            displayDelete: false,
            matched: [],
        }
        // this._handleDoubleClickItem = this._handleDoubleClickItem.bind(this);
    }
    findMatch = () => {
        console.log('props match', this.props.state.notes)
        let routeId = this.props.match.params.id;
        console.log("routeID", routeId, "typeof routeID:", typeof routeId);
        let matched = this.props.state.notes.filter( (item) => {
            console.log('item.id:', item.id, 'routeid:', routeId, 'item.id == routeId:', item.id == routeId);
            return item.id == routeId; 
        });
        console.log('matched:', matched);
        this.setState({ matched: matched });
        console.log("match?", this.state.matched);
    }

    componentDidMount = () => {
        let routeId = this.props.match.params.id;
        let matched = this.props.state.notes.filter( (item) => {
            return item.id == routeId; 
        });
        this.setState({ matched: matched[0] });
    }

    showModal = (event) => {
        event.preventDefault();
        this.setState({displayDelete: !this.state.displayDelete})
    }

    render() {
        console.log("NV History", this.props)
        return (
            <div className='view_container'>
                <div className="links_container">
                    <Link to={{pathname: `/edit/${this.props.match.params.id}`, state: this.state.matched}} 
                        className="view_links">edit
                    </Link>
                            <br />
                    <a href='' 
                        onClick={this.showModal} 
                        className="view_links">delete
                    </a>
                            <br /><br />
                </div>

                <div className="view_title">
                <span><a href=''> <Link to={{pathname: `/edit/${this.props.match.params.id}`, state: this.state.matched}} style={{ textDecoration: 'none' }}>{this.state.matched.title}</Link></a></span>
                </div>

                        <br />
                <div className="view_content">
                <span><a href=''> <Link to={{pathname: `/edit/${this.props.match.params.id}`, state: this.state.matched}} style={{ textDecoration: 'none' }}>
                    {this.state.matched.content}
                    </Link></a></span>
                </div>  
                        <br /><br />
                <DeleteNote
                    state={this.state}
                    history={this.props.history} 
                    toggle={this.state.displayDelete}
                    showModal={this.showModal}
                />
            </div>
        );
    }
}


export default NoteView;