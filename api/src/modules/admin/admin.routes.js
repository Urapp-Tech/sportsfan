import backOfficeUserRoutes from './office-user/office-user.routes.js';
import rolePermissionsRoutes from './role-permissions/role-permissions.routes.js';
import pageRoutes from './page/page.routes.js';
import blogRoutes from './blog/blog.routes.js';
import productRoutes from './product/product.routes.js';
import feedbackRoutes from './feedback/feedback.routes.js';

const adminRoutes = (fastify, options, done) => {
  fastify.register(backOfficeUserRoutes, { prefix: '/office-user' });
  fastify.register(rolePermissionsRoutes, { prefix: '/role' });
  fastify.register(pageRoutes, { prefix: '/page' });
  fastify.register(blogRoutes, { prefix: '/blog' });
  fastify.register(productRoutes, { prefix: '/product' });
  fastify.register(feedbackRoutes, { prefix: '/feedback' });

  done();
};

export default adminRoutes;
