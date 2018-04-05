import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NoteView extends Component {
    render() {
        return (
            <div>
                <div className="section__content__left">
                <h1 className="title"><Link to='/' className="title__link">Lambda Notes</Link></h1>
                    <button className="button__main">View Your Notes</button>
                    <br />
                    <button className="button__main">+ Create New Note</button>

                </div>
                <div className="main">
                    <div className="main__list">

                    <div className="button__side">
                    <button className="button"><Link to='/edit'><div className="text__change">edit</div></Link></button>
                    <button className="button"><Link to='/delete'><div className="text__change">delete</div></Link></button>
                    </div>
                        <h3 className="title__main">Note Name</h3>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu laoreet neque. In volutpat, purus quis aliquam accumsan, neque mauris semper diam, vitae finibus diam augue eu massa. Vivamus ultricies nisl et tincidunt sollicitudin. Vestibulum id feugiat arcu. Nam viverra vitae lacus in vestibulum. Curabitur gravida neque posuere massa dapibus, vel malesuada purus scelerisque. Nunc blandit dolor sit amet ex molestie, a dapibus eros eleifend. Aenean quis mi arcu. Curabitur eu lacus tristique mauris convallis fringilla vestibulum non sem. Curabitur quis varius est. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
                        Phasellus sed pretium risus, vel congue orci. Integer tempor justo eget felis interdum pulvinar. Ut vel feugiat ipsum. Nullam commodo sem eget placerat hendrerit. Suspendisse in congue quam, ac finibus lorem. Cras sed imperdiet urna. Duis eget urna interdum, placerat est suscipit, molestie mauris. Phasellus tincidunt, tortor at aliquet congue, lacus ex facilisis ligula, eu commodo nibh augue eu purus.
                        Phasellus quis urna sit amet erat rutrum sagittis. Vivamus sit amet rhoncus velit. Etiam et eleifend mi, ut dapibus erat. Pellentesque vestibulum consequat turpis quis vestibulum. Ut et erat ante. Phasellus risus risus, sagittis vel odio id, ultricies condimentum orci. Nam at diam feugiat, volutpat erat sit amet, maximus augue. Donec tortor urna, malesuada eget facilisis sed, placerat vitae ligula. Suspendisse at suscipit nunc. In hac habitasse platea dictumst. Vestibulum interdum magna at nunc pellentesque fermentum id varius nibh. Nullam accumsan facilisis lorem sit amet fringilla. Aenean a pharetra est. Proin ultrices tincidunt lacus, a molestie dolor scelerisque a.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default NoteView;