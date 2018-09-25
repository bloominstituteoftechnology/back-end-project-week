const express = require('express'),
  cors = require('cors'),
  helmet = require('helmet'),
  logger = require('morgan');

const app = express();
const routes = require('./routes');

// async error catcher
function asyncWrapper(handler) {
  return function(req, res, next) {
    return Promise.resolve(handler(req, res, next)).catch(next);
  };
}

app.use(cors());
app.use(helmet());
app.use(logger('short'));

app.use('/api', asyncWrapper(routes));

// catch all error handler
app.use(function(err, _, res, _) {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>
  console.log(`
=== Server listening on port ${PORT} ===
`),
);
