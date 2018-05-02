module.exports = function(server) {
  server.get('/', function(req, res) {
    res.send({ api: 'up and running' });
  });
};
