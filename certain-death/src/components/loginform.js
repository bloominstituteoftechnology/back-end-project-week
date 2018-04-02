import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { updateNote } from '../actions';
import Button from './button';

const StyledUpdateForm = styled.div`
  display: flex;

  form {
    display: flex;
    flex-wrap: wrap;
  }

  input {
    margin-left: 10px;
    border-radius: 2px;
    border: 1px solid #bfbfc0;
    font-size: 1.4rem;
    letter-spacing: 1px;    
    &:focus {
      outline: none;
    }
  }

  .form__input {
    width: 340px;
    height: 40px;
    margin-top: 20px;
    padding: 8px;
  }

  button {
    margin-left: 10px;
  }

`;

class UpdateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.notes.find(val => val.id.toString() === this.props.id).title,
      body: this.props.notes.find(val => val.id.toString() === this.props.id).body,
      redirect: false,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.updateNote({
      id: this.props.id,
      title: this.state.title,
      body: this.state.body,
    });
    this.setState({
      title: '',
      body: '',
      redirect: true,
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <StyledUpdateForm>
        <form onSubmit={this.handleSubmit}>
          <input
            className='form__input'
            type='text'
            name='username'
            placeholder='Username (required, 20 chars max)...'
            maxLength='20'
            required
            onChange={this.handleChange}
            value={this.state.username}
          />
          <input
            className='form__input'
            type='text'
            name='password'
            placeholder='Password (required, 15 chars max)...'
            maxLength='15'
            required
            onChange={this.handleChange}
            value={this.state.password}
          />
          <input
            className='form__input'
            type='text'
            name='confirmPassword'
            placeholder='Confirm Password (required for signup)...'
            maxLength='15'
            onChange={this.handleChange}
            value={this.state.confirmPassword}
          />
          <Button type='submit' backgroundColor='rgb(34, 170, 61)' title='Update' />
        </form>
        {this.state.redirect ? <Redirect to={`/fullnote/${this.props.id}`} /> : null}
      </StyledUpdateForm>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notes: state.notes,
  };
};

export default connect(mapStateToProps, { updateNote })(UpdateForm);
