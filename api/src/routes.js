import adminRoutes from "./modules/admin/admin.routes.js";

const routes = (fastify, options, done) => {
  fastify.register(adminRoutes, { prefix: "/admin" });
  done();
};

export default routes;
