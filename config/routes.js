
module.exports = server => {
    server.get('/', helloWorld);
}

const helloWorld = (req, res) => {
    res.status(200).json('Hello World');
}