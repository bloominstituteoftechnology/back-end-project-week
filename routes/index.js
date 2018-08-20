import userRoutes from './userRoutes';
import noteRoutes from './noteRoutes';

module.exports = app => {
  app.use('/api/users', userRoutes);
  app.use('/api/notes', noteRoutes);
};
