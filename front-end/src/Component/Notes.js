import React, { Component } from "react";
import { connect } from "react-redux";
import { getNotes } from '../Actions';

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      tags: false,
      addTags: false
    };
  }

  componentDidMount() {
    this.props.getNotes();
  }

  searchChangeHandler = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  hoverToggle = () => {
    const active = this.state.tags;
    this.setState({ tags: !active });
  };

  mouseOut = () => {
    this.setState({ tags: false });
  };

  addTags = () => {
    const active = this.state.addTags;
    this.setState({ addTags: !active });
  };

  render() {
    
    const filter = this.props.notesReceived ? this.props.notes.filter(note =>
      note.title.toLowerCase().includes(this.state.search.toLowerCase())
    ) : [{title: 'test', content:'test content', id: '1'}];
    return (
      <div className="Notes">
        <div className="Notes--Search">
          <input
            placeholder="Search..."
            name="search"
            value={this.state.search}
            onChange={this.searchChangeHandler}
          />
        </div>
        <ul>
          {filter.map((note, index) => {
            return (
              <li
                key={note._id}
                className="note"
                onClick={() => {
                  this.props.previewNote(note.title, note.content, note._id);
                }}
                onMouseOver={this.hoverToggle}
                onMouseOut={this.mouseOut}
              >
                <div className="note--title">
                  {note.title.length > 30
                    ? note.title.substring(0, 30).concat("...")
                    : note.title}
                </div>
                <br />
                <div className="note--text">
                  {note.content.length > 70
                    ? note.content.substring(0, 70).concat("...")
                    : note.content}
                </div>
                {/* <div className='note--tags' style={this.state.tags ? {display: 'inline'} : {display: 'none'}} onClick={this.addTags}>
                        +
                    </div>
                    <ul style={this.state.addTags ? {display: 'inline'} : {display: 'none'}}>
                    <li>Blue</li>
                    <li>Red</li>
                    </ul> */}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notes: state.notes, 
    notesReceived: state.notesReceived
  };
};

export default connect(mapStateToProps, {getNotes})(Notes);
