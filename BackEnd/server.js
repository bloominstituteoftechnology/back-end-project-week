const express = require('express');
const morgan = require('morgan');

const server = express();

const usersRoutes = require('./routes/users');
const notesRoutes = require('./routes/notes');

// Middleware
app.use(morgan('dev'));

// Routes

app.use('/users', usersRoutes);

// 404 Errors

server.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error Handler

app.use((err, req, res, next) => {
    const error = server.get('env') === 'development' ? err : {};
    const status = err.status || 500;


    // Server Output

    console.error(err);

    // Client Output

    res.status(status).json({
        error: {
            message: err.message
        }
    });
});

// Initialize Server
const port = server.get('port') || 5050;
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
});
