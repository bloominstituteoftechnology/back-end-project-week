import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
import { Card, CardTitle, CardText, Button } from 'reactstrap';


class TodoList extends Component{
    constructor(props){
        super(props);
        this.state = {
           todos: [],
           title: '',
           text: '',
           completed: false
        }
    }

    componentDidMount(){
        const api = process.env.MONGODB_URI || 'http://localhost:5001';
        axios
        .get(api)
        .then(response => {
            this.setState(() => ({todos: [...response.data]}))
        })
        .catch(err => {
            console.log('error', err)
        })
    }

    render(){
        return (
            <div>
                <ul>
                {this.state.todos.map((todo, i)=> {
                    return (
                        <li todo={todo} key={i}>
                        <Card>
                            <CardTitle>{todo.title}</CardTitle>
                            <CardText>Text: {todo.text}</CardText>
                            <CardText>Completed: {todo.completed}</CardText>
                        </Card>
                        </li>
                        )
                    })}
                </ul>
                <Link to='/'><Button>Home</Button></Link>
            </div>
        )
    }
}
export default TodoList;