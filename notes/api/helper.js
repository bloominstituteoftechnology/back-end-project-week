const send = (res, code, msg, err = null) => {
  res.status(code).json({ msg, err });
};

const message = {
  noTitleNoTex: 'Please provide a title and/or text',
  created: 'Note created.',
  serverError: 'Server error.',
};

module.exports = {
  send,
  message,
};
