import controller from "./role-permissions.controller.js";
import schema from "./role-permissions.swagger.js";

const rolePermissionsRoutes = (fastify, options, done) => {
  fastify.get(
    "/list",
    { schema: schema.list, onRequest: [fastify.authenticateAccess] },
    controller.list
  );
  fastify.post(
    "/create",
    { schema: schema.create, onRequest: [fastify.authenticateAccess] },
    controller.create
  );
  fastify.post(
    "/update/:roleId",
    { schema: schema.update, onRequest: [fastify.authenticateAccess] },
    controller.update
  );
  fastify.post(
    "/delete/:roleId",
    { schema: schema.delete, onRequest: [fastify.authenticateAccess] },
    controller.deleteEmp
  );
  fastify.get(
    "/lov",
    { schema: schema.lov, onRequest: [fastify.authenticateAccess] },
    controller.lov
  );

  // PERMISSIONS

  fastify.get(
    "/permission/list",
    { schema: schema.permissionList, onRequest: [fastify.authenticateAccess] },
    controller.permissionList
  );

  done();
};

export default rolePermissionsRoutes;
