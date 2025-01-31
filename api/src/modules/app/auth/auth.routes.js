import schema from './auth.swagger.js';
import controller from './auth.controller.js'

const appAuthRouts = (fastify, options, done) => {
    fastify.post('/login', { schema: schema.login }, controller.login);
    fastify.post('/register', { schema: schema.register }, controller.register);
    fastify.post('/forgot-password', { schema: schema.forgotPassword }, controller.forgotPassword);
    fastify.post('/verify-otp', { schema: schema.verifyOtp }, controller.otpVerify);
    fastify.post('/reset-password', { schema: schema.resetPassword }, controller.resetPassword);

    done();
}

export default appAuthRouts;