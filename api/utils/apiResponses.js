const VALIDATION_ERROR = 'ValidationError';
const CAST_ERROR = 'CastError';

const sendErr = (res, err, defaultMessage) => {
  switch (err.name) {
    case VALIDATION_ERROR:
      res.status(400);
      res.json({ error: err.message });
      return;

    case CAST_ERROR:
      res.status(404);
      res.json({ error: 'The document with the specified ID does not exist.' });
      return;

    default:
      res.status(500);
      res.json({ error: defaultMessage });
      return;
  }
};

module.exports = {
  sendErr
};
