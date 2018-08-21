const express = require('express');

const app = express();

require('./middleware')(app);
require('./routes')(app);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
