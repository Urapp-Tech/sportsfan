import promiseHandler from '#utilities/promise-handler';
import handleResponse from '#utilities/response-helper';
import service from './auth.service.js';

const login = async (req, res) => {
    const promise = promiseHandler(service.login(req));
    return handleResponse(req, res, promise);
};

const register = async (req, res) => {
    const promise = promiseHandler(service.register(req));
    return handleResponse(req, res, promise);
}

const forgotPassword = async (req, res) => {
    const promise = promiseHandler(service.forgotPassword(req));
    return handleResponse(req, res, promise);
}

const resetPassword = async (req, res) => {
    const promise = promiseHandler(service.resetPassword(req));
    return handleResponse(req, res, promise);
}

const otpVerify = async (req, res) => {
    const promise = promiseHandler(service.verifyOtp(req));
    return handleResponse(req, res, promise);
}

export default {
  login,
  register,
  forgotPassword,
  resetPassword,
  otpVerify,
};
