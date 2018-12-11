import React from 'react';
// import GoogleLogin from 'react-google-login';
// import FacebookLogin from 'react-facebook-login';
import { Link } from 'react-router-dom';

const LogIn = () => {

    // const responseGoogle = (response) => {
    //     console.log(response);
    //   }

    //   const responseFacebook = (response) => {
    //     console.log(response);
    //   }

    return (
        <div className = "card-content">
        <h1>Welcome to Lambda Notes!</h1>
        <h2>Log In to view your old notes, or create a new one.</h2>

          {/* <GoogleLogin
    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
  />

  <FacebookLogin
    appId="207431136838082"
    autoLoad={true}
    fields="name,email,picture"
    onClick={componentClicked}
    callback={responseFacebook} /> */}

        </div>
    )
}


export default LogIn;