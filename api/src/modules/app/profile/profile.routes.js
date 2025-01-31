import schema from './profile.swagger.js';
import controller from './profile.controller.js'

const appProfileRouts = (fastify, options, done) => {
    fastify.post('/update', { schema: schema.profileUpdate,onRequest:[ fastify.authenticateAccess ] }, controller.update);
    fastify.post('/update-password', { schema: schema.updatePassword,onRequest:[ fastify.authenticateAccess ] }, controller.updatePassword);

    done();
}

export default appProfileRouts;