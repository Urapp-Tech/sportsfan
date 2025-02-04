import schema from './blog.swagger.js';
import controller from './blog.controller.js';

const appBlogRouts = (fastify, options, done) => {
  fastify.get(
    '/list',
    { schema: schema.list, onRequest: [fastify.authenticateAccess] },
    controller.list
  );


  done();
};

export default appBlogRouts;
