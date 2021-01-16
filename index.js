const app = require('./server.js');

const port = 7002;

app.listen(port, () => {
    console.log(`\n Server listening on port : ${port}`);
});
