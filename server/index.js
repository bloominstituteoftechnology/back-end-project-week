const { server } = require('./server');

const port = 3333;

server.listen(port, () => {
    console.log(
        `\n ======================================== \n\t Server Running on port:${port} \n\t\t @ http://localhost:${port}/ \n ========================================`);
});