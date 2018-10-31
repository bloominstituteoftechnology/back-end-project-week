import React, { Component } from 'react';
import './Notes.css';
import OneNote from './OneNote';

class Notes extends Component {

constructor(props){
super(props);
this.state={};
}

componentDidMount(){
this.props.get_notes(this.props.token);
}

render(){
return(
<div className="notes">
{this.props.view==="all" ? (
<React.Fragment>
<div className="heading">All Notes:</div>
<div className="notesContainer">
{this.props.notes.map((note,index)=>{
return(
<div key={Math.random(Date.now())} className="note" onClick={()=>this.props.viewone(index)}>
<div className="title">{note.title}</div>
{note.content.length>200 ? (<div className="contents">{note.content.slice(0,200)}...</div>):(
<div className="contents">{note.content}</div>)}
</div>
);})}
</div>
</React.Fragment>
):(null)}
{this.props.view==="my" ? (
<React.Fragment>
<div className="heading">Your Notes:</div>
<div className="notesContainer">
	{this.props.notes.map((note,index)=>{
if(note.poster===this.props.loggedIn){
return(
<div key={Math.random(Date.now())} className="note" onClick={()=>this.props.viewone(index)}>
<div className="title">{note.title}</div>
{note.content.length>200 ? (<div className="contents">{note.content.slice(0,200)}...</div>):(
<div className="contents">{note.content}</div>)}
</div>
);}
else{return null}
})}
</div>
</React.Fragment>
):(null)}
{typeof this.props.view==="number" ? (
<OneNote index={this.props.view} deleteNote={this.props.deleteNote} editNote={this.props.editNote}
 note={this.props.notes[this.props.view]} loggedIn={this.props.loggedIn} token={this.props.token}/>
):(null)}
</div>
)}
}


export default Notes