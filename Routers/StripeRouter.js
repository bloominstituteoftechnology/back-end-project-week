const express = require('express');
const router = express.Router()
const cors = require('cors');
const keyPublishable = "pk_test_vpJZ7OT67atKUohQIOAPZyxT"
const keySecret = "sk_test_aLfqAx3CG4EQnOHc5C5IhaW8";
const stripe = require("stripe")(keySecret);


router.post("/",  (req, res) => {
    let amount = 500;
  
    stripe.customers.create({
       email: "foo-123@gmail.com"
      }).then(customer => {
      stripe.charges({
        exp_month: 21,
        exp_year: 2021,
        number: "4242 4242 4242 4242",
        cvc: 100,
        customer: customer.id
      })
    })
  });
  

module.exports = router;