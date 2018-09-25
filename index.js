const express = require('express'),
  cors = require('cors'),
  helmet = require('helmet'),
  logger = require('morgan'),
  path = require('path');

const app = express();
const routes = require('./routes');

// async error catcher
function asyncWrapper(handler) {
  return async function(req, res, next) {
    try {
      await handler(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}

app.use(cors());
app.use(helmet());
app.use(logger('short'));
app.use(express.json());

app.use('/api', asyncWrapper(routes));

app.use(express.static(path.resolve(path.join(__dirname, 'public'))));
app.get('*', (_, res) => res.sendFile('/index.html'));

// catch-all error handler
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
