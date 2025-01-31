import authRoutes from './auth/auth.routes.js';
import profileRoutes from './profile/profile.routes.js';

const appRoutes = (fastify, options, done) => {
  fastify.register(authRoutes, { prefix: '/auth' });
  fastify.register(profileRoutes, { prefix: '/profile' });

  done();
};

export default appRoutes;