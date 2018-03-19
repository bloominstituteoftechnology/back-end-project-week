const send = (res, code, msg, err) => {
  err === undefined
    ? res.status(code).json(msg)
    : res.status(code).json({ msg, err });
};

const message = {
  noTitleNoTex: 'Please provide a title and/or content.',
  created: 'Note created successfully.',
  createdError: 'Server error creating note.',
  requestError: 'Server error requesting notes.',
  requestIdError: 'Note with id not found.',
  requestIdServerError: 'Server error requesting note with id.',
  updateError: 'Server error updating note.',
  serverError: 'Server error.',
};

module.exports = {
  send,
  message,
};
