const VALIDATION_ERROR = 'ValidationError';
const CAST_ERROR = 'CastError';
const NOT_FOUND = '404';
const UNAUTHORIZED = '401';
const FORBIDDEN = '403';

const sendErr = (res, err, message) => {
  switch (err.name || err) {
    case VALIDATION_ERROR:
      res.status(400);
      res.json({ error: err.message });
      return;
    case UNAUTHORIZED:
      res.status(401);
      res.json({ error: message });
      return;
    case FORBIDDEN:
      res.status(403);
      res.json({ error: message });
      return;
    case CAST_ERROR:
      res.status(404);
      res.json({ error: 'The document with the specified ID does not exist.' });
      return;
    case NOT_FOUND:
      res.status(404);
      res.json({ error: message });
    default:
      res.status(500);
      res.json({ error: message });
      return;
  }
};

const sendRes = (res, status, resData) => {
  return resData
    ? res.status(status).json(resData)
    : res
        .status(404)
        .json({ error: 'The document with the specified ID does not exist.' });
};

module.exports = {
  sendErr,
  sendRes
};
