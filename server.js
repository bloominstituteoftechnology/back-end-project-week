const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const server = express();

// middleware
server.use(express.json());

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Server running on port: ${port}`))