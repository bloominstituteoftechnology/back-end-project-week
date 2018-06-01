import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import styled from 'styled-components';

export default class Note extends Component {
render = () => {
    const { title, text, completed, index } = this.props; 
    return (
        <div className='note'>
        <div>
        <h3>{title}</h3>
        <div className='divider'></div>
        <p>{text}</p>
        </div>
        <button onClick={() => markComplete(index)}
        className='complete'>Completed</button>
        <button className='delete'>Delete</button>
        </div>
    )
}
}