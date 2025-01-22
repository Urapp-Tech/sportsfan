import controller from "./role-permissions.controller.js";
import schema from "./role-permissions.swagger.js";

const rolePermissionsRoutes = (fastify, options, done) => {
  fastify.get(
    "/list",
    { schema: schema.list, onRequest: [fastify.authenticateAccess] },
    controller.list
  );

  done();
};

export default rolePermissionsRoutes;
