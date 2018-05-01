const validate = function(req, res, next) {
    if (req && req.session) {
      User.findById(req.session.user_id)
      .then(res => {
        req.user = res;
        next();
      }).catch(console.log('No user could be found.'));
    } else {
      sendUserError({ error: "You are not logged in." }, res);
      return;
    } 
  };

  module.exports = validate;