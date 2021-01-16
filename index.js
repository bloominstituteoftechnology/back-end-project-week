const app = require('./server.js');

const port = process.env.PORT || 7002;

app.listen(port, () => {
    console.log(`\n Server listening on port : ${port}`);
});
