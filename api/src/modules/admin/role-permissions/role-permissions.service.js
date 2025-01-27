import model from "#models/role-permission.model";
import generateUserTokens from "#utilities/generate-user-tokens";
import HTTP_STATUS from "#utilities/http-status";
import promiseHandler from "#utilities/promise-handler";
import createRedisFunctions from "#utilities/redis-helpers";
import {
  getAccessTokenKey,
  getKeysPattern,
  getRefreshTokenKey,
} from "#utilities/redis-keys";

const list = async (req, params) => {
  // console.log("params :>> ", params);
  const promise = model.list(req, params);
  const [error, result] = await promiseHandler(promise);
  if (error) {
    const err = new Error(error.detail ?? error.message);
    err.code = error.code ?? HTTP_STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }
  return {
    code: HTTP_STATUS.OK,
    message: "Data has been fetched successfully.",
    data: result,
  };
};

const create = async (req, params) => {
  const promise = model.create(req, params);

  const [error, result] = await promiseHandler(promise);
  if (error) {
    const err = new Error(error.detail ?? error.message);
    err.code = error.code ?? HTTP_STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }

  return {
    code: HTTP_STATUS.OK,
    message: "Role has been created successfully.",
    data: { ...result },
  };
};

const update = async (req, params) => {
  const promise = model.update(req, params);

  const [error, result] = await promiseHandler(promise);
  if (error) {
    const err = new Error(error.detail ?? error.message);
    err.code = error.code ?? HTTP_STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }

  return {
    code: HTTP_STATUS.OK,
    message: "Role has been updated successfully.",
    data: { ...result },
  };
};

const deleteRole = async (req, params) => {
  const promise = model.deleteRole(req, params);

  const [error, result] = await promiseHandler(promise);
  if (error) {
    const err = new Error(error.detail ?? error.message);
    err.code = error.code ?? HTTP_STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }

  return {
    code: HTTP_STATUS.OK,
    message: "Role has been deleted successfully.",
    data: { ...result },
  };
};

const lov = async (req, params) => {
  const promise = model.lov(req, params);

  const [error, result] = await promiseHandler(promise);
  if (error) {
    const err = new Error(error.detail ?? error.message);
    err.code = error.code ?? HTTP_STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }

  return {
    code: HTTP_STATUS.OK,
    message: "Role Lov has been fetched successfully.",
    data: result,
  };
};

const permissionList = async (req, params) => {
  const promise = model.permissionList(req, params);
  const [error, result] = await promiseHandler(promise);
  if (error) {
    const err = new Error(error.detail ?? error.message);
    err.code = error.code ?? HTTP_STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }
  return {
    code: HTTP_STATUS.OK,
    message: "Data has been fetched successfully.",
    data: result,
  };
};

export default {
  list,
  create,
  update,
  deleteRole,
  lov,
  permissionList,
};
