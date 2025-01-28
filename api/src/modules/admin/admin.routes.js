import backOfficeUserRoutes from './office-user/office-user.routes.js';
import rolePermissionsRoutes from './role-permissions/role-permissions.routes.js';
import pageRoutes from './page/page.routes.js';
import blogRoutes from './blog/blog.routes.js';

const adminRoutes = (fastify, options, done) => {
  fastify.register(backOfficeUserRoutes, { prefix: '/office-user' });
  fastify.register(rolePermissionsRoutes, { prefix: '/role' });
  fastify.register(pageRoutes, { prefix: '/page' });
  fastify.register(blogRoutes, { prefix: '/blog' });

  done();
};

export default adminRoutes;
