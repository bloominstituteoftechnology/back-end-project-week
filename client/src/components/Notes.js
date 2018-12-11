import React from 'react';
import Note from './Note';
// import RGL, { WidthProvider } from 'react-grid-layout';


//Adding dragable elements
// const ReactGridLayout = WidthProvider(RGL);

// class Notes extends React.Component {
//     constructor(props) {
//         super(props);
//         const layout = this.generateLayout();
//         this.state = { layout }
//     }
//         static defaultProps = {
//             className: "layout",
//             items: 50,
//             rowHeight: 250,
//             onLayoutChange: function() {},
//             cols: 3
//         }
//     };

//     generateLayout() {
//         const p = this.props;
//         return
//     }
    const Notes = props => {

    // render() {
        return(
            <div className="app-container">
                <h1>Your Notes:</h1>
                <div className="card-container">
                    {props.notes.map(note => {
                        return(
                            <div key={note.id} className="card">
                            <Note
                            title={note.title}
                            textBody={note.textBody}
                            id={note.id}
                            />
                            </div> 
                        );
                    })}
                </div>
            </div>
        )
    }
    


export default Notes;