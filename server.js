const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const apiRoutes = require('./data/routers/apiRoutes');

const server = express();

server.use(express.json());
server.use(morgan('dev'));
server.use(cors());
server.use(helmet());

server.use('/api', apiRoutes);

server.use((err, req, res, next) => {
    switch (err.code) {
        case 500:
            res.status(500).send({
                success: false,
                data: undefined,
                title: err.message,
                description: 'Failed get',
                recovery: 'Please check database'
            })
            break;
        case 501:
            res.status(501).send({
                success: false,
                data: undefined,
                title: 'Bad database modification',
                description: err.message,
                recovery: 'Please check inputs'
            })
            break;
        case 502:
            res.status(502).send({
                success: false,
                data: undefined,
                title: 'Removed Failed',
                description: err.message,
                recovery: 'Please check inputs'
            })
            break;
        default:
            res.status(404).send({ message: 'Something bad happened' })
    }
})

server.listen(8000, () => console.log('API running on port 8000... *.*'));