const express = require('express');
const server = require('./server.js');

server.listen(5000, () => {
  console.log('\n* Server Running on http://localhost:5000 *\n');
});