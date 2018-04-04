const isLoggedIn = (req, res, next) => {
  if (req.isAuth) {
    return next();
  } else {
    console.log(req);
    res.status(401).json({ error: 'Not Authorized' });
  }
};


module.exports = isLoggedIn;
