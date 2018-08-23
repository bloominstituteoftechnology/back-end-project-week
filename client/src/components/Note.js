import React from "react";
import { Card, CardTitle, CardBody, CardText } from "reactstrap";

const Note = props => {
  return (
    <div onClick={props.clicked}>
      <Card>
        <CardBody>
          <CardTitle>{props.title}</CardTitle>
          <CardText>{props.textBody}</CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default Note;
