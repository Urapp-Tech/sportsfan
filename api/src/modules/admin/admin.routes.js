import backOfficeUserRoutes from './office-user/office-user.routes.js';
import rolePermissionsRoutes from './role-permissions/role-permissions.routes.js';

const adminRoutes = (fastify, options, done) => {
  fastify.register(backOfficeUserRoutes, { prefix: '/office-user' });
  fastify.register(rolePermissionsRoutes, { prefix: '/role' });

  done();
};

export default adminRoutes;
