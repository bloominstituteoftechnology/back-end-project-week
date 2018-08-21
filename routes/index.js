const userRoutes = require('./userRoutes');
const noteRoutes = require('./noteRoutes');

module.exports = app => {
  app.use('/api/users', userRoutes);
  app.use('/api/notes', noteRoutes);
};
