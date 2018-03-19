const send = (res, code, msg, err = undefined) => {
  err === undefined
    ? res.status(code).json(msg)
    : res.status(code).json({ msg, err });
};

const message = {
  noTitleNoTex: 'Please provide a title and/or content.',
  created: 'Note created successfully.',
  createdError: 'Server error creating note.',
  serverError: 'Server error.',
};

module.exports = {
  send,
  message,
};
