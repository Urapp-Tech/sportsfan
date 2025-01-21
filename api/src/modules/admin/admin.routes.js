import backOfficeUserRoutes from "./office-user/office-user.routes.js";

const adminRoutes = (fastify, options, done) => {
  fastify.register(backOfficeUserRoutes, { prefix: "/office-user" });

  done();
};

export default adminRoutes;
