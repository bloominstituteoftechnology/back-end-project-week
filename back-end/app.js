const { server } = require('./routes/server.js');

const port = process.env.PORT || 5000;

server.listen(5000, () => {
    console.log(`API running on http://localhost:${port}.`);
});
