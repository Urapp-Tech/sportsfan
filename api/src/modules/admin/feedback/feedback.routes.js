import controller from './feedback.controller.js';
import schema from './feedback.swagger.js';

const routes = (fastify, options, done) => {
  fastify.get(
    '/list',
    { schema: schema.list, onRequest: [fastify.authenticateAccess] },
    controller.list
  );
  fastify.get(
    '/detail/:id',
    { schema: schema.detail, onRequest: [fastify.authenticateAccess] },
    controller.detail
  );
  // fastify.post(
  //   '/update/:id',
  //   { schema: schema.update, onRequest: [fastify.authenticateAccess] },
  //   controller.update
  // );
  fastify.post(
    '/delete/:id',
    { schema: schema.delete, onRequest: [fastify.authenticateAccess] },
    controller.deleteRecord
  );

  done();
};

export default routes;
