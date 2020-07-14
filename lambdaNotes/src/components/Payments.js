import React, { Component } from "react";
import axios from 'axios';
import StripeCheckout from "react-stripe-checkout";
import { Credits } from "../Styles";

class Payments extends Component {
  handleToken = token => {
    axios
      .post("/api/stripe", token)
      .then(res => {
        this.props.handlePayment();
        this.setState(() => ({ user: res.data }));
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <StripeCheckout
        name="VIP Features"
        description="$5 for 5 credits"
        amount={500}
        token={token => this.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <Credits>Buy Credits</Credits>
      </StripeCheckout>
    );
  }
}

export default Payments;

console.log("key", process.env.REACT_APP_STRIPE_KEY);
console.log("Enviroment", process.env.NODE_ENV);
