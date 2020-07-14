
const express = require('express'),

cors = require('cors'),
helmet = require('helmet'),
logger = require('morgan');

const app = express();
const routes = require('./routes');

app.use(cors());
app.use(helmet());
app.use(express.json());
// ***** BELOW Concise output colored by response status for development use. The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes. BELOW ***** //
app.use(logger('dev'));
app.use('/api', wrapper(routes));

 // ***** Error Catch ***** //
function wrapper(handler) {
  return function(req, res, next) {
    return Promise.resolve(handler(req, res, next)).catch(next);
  };
}

 // ***** Error handler ***** //
app.use(function(err, _, res, _) {
  console.error(err);
  res.status(500).json({ Error: `I'm not telling you a damn thing!!!` });
});


const PORT = process.env.PORT || 9001;
app.listen(PORT, () =>
  console.log(`=== Power level over ${PORT}!!! ===`),
);