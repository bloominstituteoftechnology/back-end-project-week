const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const { errorHandler, authenticate } = require('./middleware');

module.exports = server => {
  server.use('/api', authRoutes);
  server.use('/api/notes', authenticate, noteRoutes);
  server.use(errorHandler);
};
