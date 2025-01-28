import promiseHandler from '#utilities/promise-handler';
import service from './blog.service.js';

const list = async (req, res) => {
  const log = req.logger;
  log.verbose(`RequestId:: ${req.id}\nHandling ${req.method} ${req.url} Route`);
  const params = {
    ...req.user,
    ...req.params,
    ...req.query,
  };
  const promise = service.list(req, params);
  const [error, result] = await promiseHandler(promise);
  if (error) {
    log.verbose(
      `RequestId:: ${req.id}\nHandling Completed With Error On ${req.method} ${req.url} Route`
    );
    log.error(
      `${error.message}\nRequestId:: ${req.id}\nTrace:: ${error.stack}`
    );

    return res.status(error.code).send({
      success: false,
      code: error.code,
      message: error.message,
      data: result.data,
    });
  }
  log.verbose(
    `RequestId:: ${req.id}\nHandling Completed With Success On ${req.method} ${req.url} Route`
  );

  return res.status(result.code).send({
    success: true,
    code: result.code,
    message: result.message,
    data: result.data,
  });
};

const create = async (req, res) => {
  const log = req.logger;
  log.verbose(`RequestId:: ${req.id}\nHandling ${req.method} ${req.url} Route`);
  const params = {
    ...req.user,
    ...req.params,
    ...req.query,
  };
  // console.log('req', req.body, params);

  const promise = service.create(req, params);
  const [error, result] = await promiseHandler(promise);
  if (error) {
    log.verbose(
      `RequestId:: ${req.id}\nHandling Completed With Error On ${req.method} ${req.url} Route`
    );
    log.error(
      `${error.message}\nRequestId:: ${req.id}\nTrace:: ${error.stack}`
    );

    return res.status(error.code).send({
      success: false,
      code: error.code,
      message: error.message,
    });
  }
  log.verbose(
    `RequestId:: ${req.id}\nHandling Completed With Success On ${req.method} ${req.url} Route`
  );

  return res.status(result.code).send({
    success: true,
    code: result.code,
    message: result.message,
    data: result.data,
  });
};

const update = async (req, res) => {
  const log = req.logger;
  log.verbose(`RequestId:: ${req.id}\nHandling ${req.method} ${req.url} Route`);
  const params = {
    ...req.user,
    ...req.params,
    ...req.query,
  };
  const promise = service.update(req, params);
  const [error, result] = await promiseHandler(promise);
  if (error) {
    log.verbose(
      `RequestId:: ${req.id}\nHandling Completed With Error On ${req.method} ${req.url} Route`
    );
    log.error(
      `${error.message}\nRequestId:: ${req.id}\nTrace:: ${error.stack}`
    );

    return res.status(error.code).send({
      success: false,
      code: error.code,
      message: error.message,
    });
  }
  log.verbose(
    `RequestId:: ${req.id}\nHandling Completed With Success On ${req.method} ${req.url} Route`
  );

  return res.status(result.code).send({
    success: true,
    code: result.code,
    message: result.message,
    data: result.data,
  });
};

const deleteRecord = async (req, res) => {
  const log = req.logger;
  log.verbose(`RequestId:: ${req.id}\nHandling ${req.method} ${req.url} Route`);
  const params = {
    ...req.user,
    ...req.params,
    ...req.query,
  };
  const promise = service.deleteRecord(req, params);
  const [error, result] = await promiseHandler(promise);
  if (error) {
    log.verbose(
      `RequestId:: ${req.id}\nHandling Completed With Error On ${req.method} ${req.url} Route`
    );
    log.error(
      `${error.message}\nRequestId:: ${req.id}\nTrace:: ${error.stack}`
    );

    return res.status(error.code).send({
      success: false,
      code: error.code,
      message: error.message,
    });
  }
  log.verbose(
    `RequestId:: ${req.id}\nHandling Completed With Success On ${req.method} ${req.url} Route`
  );

  return res.status(result.code).send({
    success: true,
    code: result.code,
    message: result.message,
  });
};

export default {
  list,
  create,
  update,
  deleteRecord,
};
