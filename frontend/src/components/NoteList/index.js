// Dependencies
import React, { Component, Fragment } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import SearchBar from './SearchBar';
// CSS
import './NoteList.css';
// Components
import connect from 'react-redux/lib/connect/connect';
import { clearError, fetchNotes, fetchTheme, logoutUser } from '../Actions';
import { Tag } from '../Forms/ViewNote';

class NoteList extends Component {

  constructor() {
    super();
    this.state = {
      loading: false,
      error: false
    }
  }

  componentDidMount = async () => {
    // console.log("Does this.props.user exist? ",this.props.user ? "YES":"NO");
    if (this.props.user) {

      // this.props.fetchTheme(this.props.user.uid);
      await this.props.fetchNotes(this.props.user.uid);

      if (this.props.error) {
        this.setState({ error: true, loading: false });
      } else {
        this.props.clearError();
        this.setState({ error: false, loading: false });
      }
    }
  }

  render = () => {
    console.log(this.props.match? this.props.match : "undefined");
    const { classes } = this.props;
    const path = this.props.match.path;
    const tag = this.props.match.params.tag;

    const getNotes = () => {
      // console.log("!!!",this.props.match.path, this.props.match.params.tag)
      let result;
      switch (this.props.match.path) {
        case '/notes/tag/:tag':
          result = this.props.notes.filter(obj => obj.tags.includes(this.props.match.params.tag));
          // console.log('!!!','notes/tag:/tag TRUE',result);
          return result
        case '/notes/search':
          return this.props.results;
        default:
          result = this.props.notes;
          // console.log('!!!',result);
          return result;
      }
    };

    const notesToDisplay = getNotes();

    switch (true) {
      case this.state.loading:
        return (
          <div className="note-list">
            <h2>We still be loadin'. Hang on tight!</h2>
          </div>
        );
      case !this.props.user:
        return <Redirect to="/" />;
      case this.state.error:
        setTimeout(() => {
          this.props.clearError();
          this.props.logoutUser();
          this.props.history.push('/login');
        }, 2500);
        return (
          <div className="note-list">
            <h3>We weren't able to retrieve your notes.</h3>
            <h5>Sending you back to log-in page...</h5>
          </div>
        );
      default:
         return (
        <div className={`note-list ${classes}`}>
          <SearchBar />
          {
            path === "/notes/tag/:tag" ?
              <h4>Notes with <Tag>{tag}</Tag></h4>
            :
              <h4>Your Notes:</h4>
          }
          <div className={`note-view d-flex flex-wrap`}>
            {
              notesToDisplay.length > 0 ?
                notesToDisplay.map(obj => <NoteCard key={obj._id} {...obj} />)
              :
                <h4 style={{"margin":"1rem"}}>No notes to display here. :(</h4>
            }
          </div>
        </div>
      );
    }
  }
}

const NoteCard = (props) => {
  const styl = {
    margin: `0 0.25rem 1rem 0.25rem`,
    height: `16px`,
    fontSize: `10px`,
  }

  const { _id, title, text, tags } = props;
    const truncTitle = title.length > 20 ? title.substring(0,17) + '...' : title;
    const truncText = text.length > 82 ? text.substring(0,72) + '...' : text;
  return (
    <div>
      <Link to={`/notes/${_id}`}>
        <Card className="note-card">
          <CardBody>
            <h3 style={{color:'var(--color-bg--button-main)'}}>{truncTitle}</h3>
            <hr style={{borderColor:'var(--color--main)',margin:'0'}} />
            { tags.map((tag, i) => <Link key={_id} to={`/notes/tag/${tag}`}><Tag key={i} style={styl}>{tag}</Tag></Link>) }
            <br />
            <CardText>{truncText}</CardText>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    notes: state.notesReducer.notes,
    results: state.notesReducer.results,
    user: state.userReducer.user,
    error: state.userReducer.error
  }
}

export default withRouter(connect(mapStateToProps, { clearError, fetchNotes, fetchTheme, logoutUser })(NoteList));