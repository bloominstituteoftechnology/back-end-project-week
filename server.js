const app = require('./app');

const PORT = '3300';

app.listen(PORT, () => {
    console.log(`\nListening on port ${PORT}\n`);
});