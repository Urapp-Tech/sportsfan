import controller from "./office-user.controller.js";
import schema from "./office-user.swagger.js";

const rolePermissionsRoutes = (fastify, options, done) => {
  fastify.get(
    "/list",
    { schema: schema.list, onRequest: [fastify.authenticateAccess] },
    controller.list
  );

  done();
};

export default rolePermissionsRoutes;
