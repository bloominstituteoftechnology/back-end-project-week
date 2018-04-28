function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

module.exports = (req, res, next) => {
  if (!req.body.email) {
    return res.status(422).send({ error: 'You must enter an email address.' });
  }

  if (!validateEmail(req.body.email)) {
    return res.status(422).send({ error: 'You must enter a valid email address.' });
  }

  if (!req.body.password) {
    return res.status(422).send({ error: 'You must enter a password.' });
  }
  return next();
};