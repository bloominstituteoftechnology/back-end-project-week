import React, { Component } from "react";
import { searchByTag } from "../../store/actions/filterActions";
import { connect } from "react-redux";

class FilteredList extends Component {
  render() {
    return <h1>Filtered List</h1>;
  }
}

const NoteCard = props => {
  return (
    <Card className="NoteCard" key={props.note.id}>
      <CardTitle>{props.note.title}</CardTitle>
      <CardBody>
        <div>{props.note.tag}</div>
        <div>
          <p>{`${props.note.text.substring(0, 10)}...`}</p>
          <p>{Moment(props.note.createdOn).fromNow()}</p>
          <Link to={`/note/${props.note.id}`}>
            <Button>...</Button>
          </Link>
          <span>{props.note.rank}</span>
        </div>
      </CardBody>
    </Card>
  );
};

export default connect(null, { searchByTag })(FilteredList);
