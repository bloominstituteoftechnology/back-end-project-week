import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import "./css/details.css";

class NoteDetails extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.note ? (
          <div>
            <div className="links">
              <Link
                className="link"
                onClick={() => this.props.enableDelete()}
                to={`/listnotes/${this.props.note.id}/delete`}
              >
                delete
              </Link>
              <Link
                className="link"
                to={`/listnotes/${this.props.note.id}/edit`}
              >
                edit
              </Link>
              <Link className="link" to={`/listnotes/`}>
                back
              </Link>
            </div>
            <div className="noteDetails">
              <h4 className="titlePreview">Title</h4>
              <div className="titlePreview">
                <p>{this.props.note.title}</p>
              </div>
              <div>
              <h4 className="contentPreview">Content</h4>
              <div className="contentPreview">
                <p>{this.props.note.content}</p>
              </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = store => {
  return { state: store }; //state is really props & store is store
};

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NoteDetails)
);
