import officeUserRoleModel from '#models/office-user-role.model';
import rolePermissionModel from '#models/role-permission.model';
import model from '#models/office-user.model';
import generateUserTokens from '#utilities/generate-user-tokens';
import HTTP_STATUS from '#utilities/http-status';
import promiseHandler from '#utilities/promise-handler';
import createRedisFunctions from '#utilities/redis-helpers';
import { v4 as uuidv4 } from 'uuid';
import {
  getAccessTokenKey,
  getKeysPattern,
  getRefreshTokenKey,
} from '#utilities/redis-keys';

const login = async (req) => {
  const promise = model.login(req);

  const [error, result] = await promiseHandler(promise);
  if (error) {
    const err = new Error(error.detail ?? error.message);
    err.code = error.code ?? HTTP_STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }

  if (result.isDeleted) {
    const err = new Error(`User does not exist`);
    err.code = HTTP_STATUS.UNAUTHORIZED;
    throw err;
  }

  if (!result.isActive) {
    const err = new Error(`User is suspended`);
    err.code = HTTP_STATUS.UNAUTHORIZED;
    throw err;
  }

  const isPasswordMatch = await req.bcrypt.compare(
    req.body.password,
    result.password
  );

  if (!isPasswordMatch) {
    const err = new Error(`invalid credentials`);
    err.code = HTTP_STATUS.UNAUTHORIZED;
    throw err;
  }

  delete result.password;

  const { id, tenant } = result;

  const [{ branch }] = await officeUserRoleModel.getBranchByUserId(req, id);
  result.branch = branch;

  const tokens = await generateUserTokens(req, { id, tenant, branch });

  const officeUSerRole = await officeUserRoleModel.officeUserRole(req, id);
  const roles = await rolePermissionModel.getPermissions(
    req,
    officeUSerRole.role.id,
    officeUSerRole.role.key
  );

  return {
    code: HTTP_STATUS.OK,
    message: 'signed in successfully.',
    data: {
      ...result,
      ...tokens,
      roles,
    },
  };
};

const logout = async (req) => {
  const { id } = req.user;

  const { keys, del } = createRedisFunctions(req.redis);

  if (req.body.invalidateAllTokens) {
    const pattern = getKeysPattern(id);
    const userKeys = await keys(pattern);
    await del(userKeys);

    return {
      code: HTTP_STATUS.OK,
      message: 'signed out successfully.',
    };
  }

  const tokenHash = req.headers.tokenHash;

  const accessTokenKey = getAccessTokenKey(id, tokenHash);
  const refreshTokenKey = getRefreshTokenKey(id, tokenHash);

  await del([accessTokenKey, refreshTokenKey]);

  return {
    code: HTTP_STATUS.OK,
    message: 'signed out successfully.',
  };
};

const list = async (req, params) => {
  const promise = model.list(req, params);

  const [error, result] = await promiseHandler(promise);

  if (error) {
    const err = new Error(error.detail ?? error.message);
    err.code = error.code ?? HTTP_STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }
  return {
    code: HTTP_STATUS.OK,
    message: 'Data has been fetched successfully.',
    data: result,
  };
};

const create = async (req, params) => {
  let logoUrl;
  console.log('req', req.body);

  if (req.body.avatar) {
    const fileData = {
      Key: `menu/${uuidv4()}-${req.body.avatar.filename}`,
      Body: req.body.avatar.buffer,
      'Content-Type': req.body.avatar.mimetype,
    };
    try {
      logoUrl = await req.s3Upload(fileData);
    } catch (error) {
      throw new Error(`Failed to upload logo to S3 ${error.message}`);
    }
  }
  const updatedData = {
    ...req.body,
    avatar: logoUrl,
  };
  const promise = model.create(req, updatedData, params);

  const [error, result] = await promiseHandler(promise);
  if (error) {
    const err = new Error(error.detail ?? error.message);
    err.code = error.code ?? HTTP_STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }

  return {
    code: HTTP_STATUS.OK,
    message: 'User has been created successfully.',
    data: { ...result },
  };
};

const update = async (req, params) => {
  const promise = model.update(req, req.body, params);

  const [error, result] = await promiseHandler(promise);
  if (error) {
    const err = new Error(error.detail ?? error.message);
    err.code = error.code ?? HTTP_STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }

  return {
    code: HTTP_STATUS.OK,
    message: 'User has been updated successfully.',
    data: { ...result },
  };
};

const deleteUser = async (req, params) => {
  const promise = model.deleteUser(req, params);

  const [error, result] = await promiseHandler(promise);
  if (error) {
    const err = new Error(error.detail ?? error.message);
    err.code = error.code ?? HTTP_STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }

  return {
    code: HTTP_STATUS.OK,
    message: 'User has been deleted successfully.',
    data: { ...result },
  };
};

export default {
  login,
  logout,
  list,
  create,
  update,
  deleteUser,
};
