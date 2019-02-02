// any function with below 4 arguments (err, req, res, next), Express treat it as
// error handle function!

module.exports = (err, req, res, next) => {
  console.log(err.stack); // stack provide trace of functions executed

  switch (err.message) {
    case "ID NOT FOUND":
      res.status(404).json({ error: err.message });
      break;
    case "needs update content":
      res.status(404).json({ error: err.message });
      break;
    default:
      res.status(500).json({ error: err.message });
      break;
  }
};
