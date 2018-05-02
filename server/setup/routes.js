module.exports = function(server) {

  server.get('/', function(req, res) {
    res.send({ api: 'up and running' });
  });

  server.post('/api/register', function(req, res) {
      const credentials = req.body;
      res.send({api: 'up and running'})
  })
};
