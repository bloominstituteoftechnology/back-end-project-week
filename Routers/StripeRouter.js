const express = require('express');
const router = express.Router()
const cors = require('cors');
const keyPublishable = "pk_test_vpJZ7OT67atKUohQIOAPZyxT"
const keySecret = "sk_test_aLfqAx3CG4EQnOHc5C5IhaW8";
const stripe = require("stripe")(keySecret);


router.post("/",  (req, res) => {
    let amount = 500;
  
    stripe.customers.create({
       email: "foo-customer@example.com",
    })
    .then(customer => {
      return stripe.customer.createSource(customer.id, {
        object: 'card',
        exp_month: 10,
        exp_year: 2018,
        number: '4242 4242 4242 4242',
        cvc: 100
      })
    })
    .then(source => {
      return stripe.charges.create({
        amount: 1600,
        currency: "usd",
        customer: source.customer
      });
    }).then(charge);
  });
  

module.exports = router;