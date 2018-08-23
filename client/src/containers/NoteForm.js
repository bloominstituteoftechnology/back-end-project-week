import React, { Component } from "react";
import { Button, Form, Label, Input } from "reactstrap";
import axios from "axios";

class NoteForm extends Component {
  state = {
    title: "",
    textBody: ""
  };
  componentDidMount() {
    this.props.submit === "Edit Note"
      ? this.setState({
          title: this.props.fill.title,
          textBody: this.props.fill.textBody
        })
      : this.setState({
          title: "",
          textBody: ""
        });
  }
  handleSubmit = () => {
    const data = {
      title: this.state.title,
      textBody: this.state.textBody
    };
    if (this.props.submit === "Add Note") {
      axios.post("/create/", data).then(response => {
        console.log(response);
      });
      document.location.reload();
    } else if (this.props.submit === "Edit Note") {
      axios.put("/edit/" + this.props.fill.id, data).then(response => {
        console.log(response);
      });
      document.location.reload();
    }
  };

  render() {
    return (
      <Form>
        <Label>Title</Label>
        <Input
          type="text"
          value={this.state.title}
          onChange={event => this.setState({ title: event.target.value })}
        />
        <Label>Body</Label>
        <Input
          type="text"
          value={this.state.textBody}
          onChange={event => this.setState({ textBody: event.target.value })}
        />
        <Button onClick={this.handleSubmit}>{this.props.submit}</Button>
      </Form>
    );
  }
}

export default NoteForm;
