import promiseHandler from '#utilities/promise-handler';
import handleResponse from '#utilities/response-helper';
import service from './profile.service.js';

const update = async (req, res) => {
    const promise = promiseHandler(service.updateProfile(req));
    return handleResponse(req, res, promise);
};

const updatePassword = async (req, res) => {
    const promise = promiseHandler(service.updatePassword(req));
    return handleResponse(req, res, promise);
}

export default {
  update,
  updatePassword,
};
