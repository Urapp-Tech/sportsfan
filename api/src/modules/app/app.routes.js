import authRoutes from './auth/auth.routes.js';
import appBlogRouts from './blog/blog.routes.js';
import profileRoutes from './profile/profile.routes.js';

const appRoutes = (fastify, options, done) => {
  fastify.register(authRoutes, { prefix: '/auth' });
  fastify.register(profileRoutes, { prefix: '/profile' });
  fastify.register(appBlogRouts, { prefix: '/blog' });

  done();
};

export default appRoutes;
