import controller from "./office-user.controller.js";
import schema from "./office-user.swagger.js";

const backOfficeUserRoutes = (fastify, options, done) => {
  fastify.post("/login", { schema: schema.login }, controller.login);
  fastify.post(
    "/logout",
    {
      schema: schema.logout,
      onRequest: [fastify.authenticateAccess],
    },
    controller.logout
  );
  fastify.get(
    "/list",
    { schema: schema.list, onRequest: [fastify.authenticateAccess] },
    controller.list
  );

  done();
};

export default backOfficeUserRoutes;
