const VALIDATION_ERROR = 'ValidationError';
const CAST_ERROR = 'CastError';

const sendErrorMessage = (err, res, defaultErr) => {
  switch (err.name) {
    case VALIDATION_ERROR:
      res.status(400).json({ error: err.message });
      return;

    case CAST_ERROR:
      res
        .status(404)
        .json({ error: 'The document with the specified ID does not exist.' });
      return;

    default:
      res.status(500).json({ error: defaultErr });
      return;
  }
};

module.exports = {
  sendErrorMessage
};
