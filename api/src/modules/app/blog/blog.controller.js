import promiseHandler from '#utilities/promise-handler';
import handleResponse from '#utilities/response-helper';
import service from './blog.service.js';

const list = async (req, res) => {
  const promise = promiseHandler(service.list(req));
  return handleResponse(req, res, promise);
};


export default {
  list,
};
