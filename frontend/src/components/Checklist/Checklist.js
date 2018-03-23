import React, { Component } from "react";
import "./Checklist.css";

class Checklist extends Component {
  state = {
    todos: [],
    newTodo: ""
  };

  // componentDidMount() {
  //   const id = this.props.routeId;
  //   console.log(id);
  //   this.props.getSingleNote(id);
  // }

  inputChangeHandler = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  addTodoHandler = event => {
    event.preventDefault();
    const newTodo = this.state.newTodo;
    let todos = this.state.todos.slice(0);
    let id = this.state.todos.length;
    todos = [...todos, { text: newTodo, completed: false, id }];
    this.setState({
      todos,
      newTodo: ""
    });
  };

  toggleCompleteHandler = id => {
    let todos = this.state.todos.slice(0);
    let newTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
        return todo;
      }
      return todo;
    });
    todos = newTodos;
    this.setState({
      todos,
      ...this.state
    });
  };

  render() {
    return (
      <div>
        <h1>Checklist Component</h1>
        <ul>
          {this.state.todos.map(todo => {
            let style = "todo";
            if (todo.completed) style = "todo--completed";
            return (
              <li
                className={style}
                key={todo.id}
                onClick={() => this.toggleCompleteHandler(todo.id)}
              >
                {todo.text}
              </li>
            );
          })}
        </ul>
        <form onSubmit={this.addTodoHandler}>
          <input
            value={this.state.newTodo}
            name="newTodo"
            onChange={this.inputChangeHandler}
          />
          <button>add</button>
        </form>
      </div>
    );
  }
}

export default Checklist;
