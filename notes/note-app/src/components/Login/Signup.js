import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';

import { register } from '../../actions';

import Header from '../app/header';

// import '../../styles/css/index.css';

class Signup extends Component {
  // state = {
  //   username: '',
  //   password: '',
  // };

  submitFormHandler = ({ username, password, confirmPassword }) => {
    this.props.register(
      username,
      password,
      confirmPassword,
      this.props.history,
    );
  };

  render() {
    return (
      <div className="Signup">
        <Header />

        <form
          className="Signup__form"
          onSubmit={this.props.handleSubmit(this.submitFormHandler)}
        >
          {/* <div className="Signup__form"> */}
          <div className="SignupDescription">
            {this.props.authenticating
              ? 'Signing up..'
              : this.props.error === ''
                ? 'Sign up for an account'
                : this.props.error}
          </div>

          <div className="SignupForm">
            <fieldset>
              <Field
                className="InputFields"
                name="username"
                component="input"
                type="text"
                placeholder="username"
              />
            </fieldset>

            <fieldset>
              <Field
                className="InputFields"
                name="password"
                component="input"
                type="password"
                placeholder="password"
              />
            </fieldset>
            <fieldset>
              <Field
                className="InputFields"
                name="confirmPassword"
                component="input"
                type="password"
                placeholder="confirm password"
              />
            </fieldset>

            <button className="SignupForm__button" action="submit">
              Sign up
            </button>
          </div>
        </form>
      </div>

      // <form className="SignupForm">
      //   <div className="InputFields">
      //     <input
      //       className="InputFields__username"
      //       onChange={this.inputHandler}
      //       onKeyUp={this.checkIfEnter}
      //       type="text"
      //       name="username"
      //       value={this.state.username}
      //       placeholder="username"
      //       disabled={this.props.isSigningUp}
      //     />

      //     <input
      //       className="InputFields__password"
      //       onChange={this.inputHandler}
      //       onKeyUp={this.checkIfEnter}
      //       type="password"
      //       name="password"
      //       value={this.state.password}
      //       placeholder="password"
      //       disabled={this.props.isSigningUp}
      //     />
      //   </div>

      //   <div
      //     className="SignupForm__button"
      //     onClick={this.props.isSigningUp ? null : this.signUpHandler}
      //     style={
      //       this.props.isSigningUp
      //         ? {
      //             background: 'white',
      //             color: 'black',
      //             opacity: '0.2',
      //             fontSize: '0.7rem',
      //             cursor: 'not-allowed',
      //           }
      //         : null
      //     }
      //   >
      //     {this.props.isSigningUp ? 'Signing up..' : 'Sign up'}
      //   </div>
      // </form>
      // </div>
      // </div>
    );
  }

  // componentWillMount() {
  //   this.props.resetError();
  // }

  // inputHandler = e => {
  //   this.setState({ [e.target.name]: e.target.value });
  // };

  // checkSignUpHandler = _ => {
  //   if (this.props.error !== '') this.props.resetError();

  //   this.props.signUpUser({ ...this.state }, this.props.history);
  // };

  // checkIfEnter = e => {
  //   if (e.keyCode === 13) {
  //     this.checkSignUpHandler();
  //   }
  // };

  // signUpHandler = _ => {
  //   this.props.signUpUser(this.state, this.props.history);
  // };

  // render() {
  //   return (
  //     <div className="Signup">
  //       <div className="Signup__title">Notes&reg;</div>
  //       {/* {!this.props.isLoggedIn ? ( */}
  //       <div className="Signup__form">
  //         <div className="SignupDescription">
  //           {this.props.isSigningUp
  //             ? 'Signing up..'
  //             : this.props.error === ''
  //               ? 'Sign up for an account'
  //               : this.props.error}
  //         </div>

  //         <form className="SignupForm">
  //           <div className="InputFields">
  //             <input
  //               className="InputFields__username"
  //               onChange={this.inputHandler}
  //               onKeyUp={this.checkIfEnter}
  //               type="text"
  //               name="username"
  //               value={this.state.username}
  //               placeholder="username"
  //               disabled={this.props.isSigningUp}
  //             />

  //             <input
  //               className="InputFields__password"
  //               onChange={this.inputHandler}
  //               onKeyUp={this.checkIfEnter}
  //               type="password"
  //               name="password"
  //               value={this.state.password}
  //               placeholder="password"
  //               disabled={this.props.isSigningUp}
  //             />
  //           </div>

  //           <div
  //             className="SignupForm__button"
  //             onClick={this.props.isSigningUp ? null : this.signUpHandler}
  //             style={
  //               this.props.isSigningUp
  //                 ? {
  //                     background: 'white',
  //                     color: 'black',
  //                     opacity: '0.2',
  //                     fontSize: '0.7rem',
  //                     cursor: 'not-allowed',
  //                   }
  //                 : null
  //             }
  //           >
  //             {this.props.isSigningUp ? 'Signing up..' : 'Sign up'}
  //           </div>
  //         </form>
  //       </div>
  //       // ) : ( // <Redirect to={`/notes/${this.state.username}`} />
  //       // )}
  //     </div>
  //   );
  // }
}

const mapStateToProps = state => {
  return {
    // isSigningUp: state.isSigningUp,
    // isLoggedIn: state.isLoggedIn,
    // error: state.error,
    authenticating: state.auth.authenticating,
    error: state.auth.error,
  };
};

Signup = connect(mapStateToProps, { register })(Signup);

export default reduxForm({
  form: 'signup',
  fields: ['username', 'password', 'confirmPassword'],
})(Signup);

// export default connect(mapStateToProps, {
//   resetError,
//   signUpUser,
// })(Signup);
