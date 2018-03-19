const send = (res, code, message, err) => {
  err === undefined
    ? res.status(code).json(message)
    : res.status(code).json({ message, err });
};

module.exports = {
  send,
};
