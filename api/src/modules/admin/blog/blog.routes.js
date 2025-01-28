import controller from './blog.controller.js';
import schema from './blog.swagger.js';

const routes = (fastify, options, done) => {
  fastify.get(
    '/list',
    { schema: schema.list, onRequest: [fastify.authenticateAccess] },
    controller.list
  );
  fastify.post(
    '/create',
    { schema: schema.create, onRequest: [fastify.authenticateAccess] },
    controller.create
  );
  fastify.post(
    '/update/:id',
    { schema: schema.update, onRequest: [fastify.authenticateAccess] },
    controller.update
  );
  fastify.post(
    '/delete/:id',
    { schema: schema.delete, onRequest: [fastify.authenticateAccess] },
    controller.deleteRecord
  );

  done();
};

export default routes;
