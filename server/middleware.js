const express = require('express');
const path = require('path');

module.exports = {
  server: function(server) {
    server.use(express.json());
    server.use(express.static(path.resolve(__dirname, '../client/build')));
  }
};
