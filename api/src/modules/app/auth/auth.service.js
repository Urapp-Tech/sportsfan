import model from '#models/user.model';
import { forgotPasswordTemplate } from '#utilities/email-templates';
import generateUserTokens from '#utilities/generate-user-tokens';
import HTTP_STATUS from '#utilities/http-status';
import generate from '#utilities/otp-generator';
import promiseHandler from '#utilities/promise-handler';
import createRedisFunctions from '#utilities/redis-helpers';
import { getAccessTokenKey, getKeysPattern, getRefreshTokenKey } from '#utilities/redis-keys';

/**
 * Authenticate USer.
 * @param {Object} req
 * @returns {Object}
 *
 */
const login = async (req) => {
  const [error, result] = await promiseHandler(
    model.getUserBy(req.knex, (db) => {
      db.where('email', req.body.email).andWhere('tenant', req.query.tenant).where('is_deleted',false);
    })
  );

  if (error) {
    const err = new Error(error.detail ?? error.message);
    err.code = error.code ?? HTTP_STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }

  if (!result) {
    const err = new Error(`User does not exist`);
    err.code = HTTP_STATUS.UNAUTHORIZED;
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
    const err = new Error(`Invalid Credentials`);
    err.code = HTTP_STATUS.UNAUTHORIZED;
    throw err;
  }

  delete result.password;

  const { id, tenant } = result;

  const tokens = await generateUserTokens(req, { id, tenant });

  return {
    code: HTTP_STATUS.OK,
    message: 'signed in successfully.',
    data: {
      ...result,
      ...tokens,
    },
  };
};

/**
 * Register user
 * @param {Object} req
 * @returns {Object}
 */
const register = async (req) => {
  const [error, result] = await promiseHandler(
    model.getUserBy(req.knex, (db) => {
      db.where('email', req.body.email).orWhere('username', req.body.username);
    })
  );

  if (error) {
    const err = new Error(error.detail ?? error.message);
    err.code = error.code ?? HTTP_STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }

  if (result) {
    const err = new Error(`User already registered. Log in to continue`);
    err.code = HTTP_STATUS.BAD_REQUEST;
    throw err;
  }

  const data = { ...req.body, tenant: req.query.tenant };

  if (data.password_confirmed !== data.password) {
    const err = new Error(`Password does not match`);
    err.code = HTTP_STATUS.BAD_REQUEST;
    throw err;
  }

  delete data.password_confirmed;
  const [create_error, registered] = await promiseHandler(
    model.createUser(req.knex, {
      ...data,
      password: await req.bcrypt.hash(data.password),
    })
  );

  if (create_error) {
    const err = new Error(create_error.detail ?? create_error.message);
    err.code = create_error.code ?? HTTP_STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }

  const { id, tenant } = registered;

  const tokens = await generateUserTokens(req, { id, tenant });

  return {
    code: HTTP_STATUS.OK,
    message: 'registered successfully.',
    data: {
      ...registered,
      ...tokens,
    },
  };
};

/**
 * Send forgot password mail.
 * @param {Object} req
 * @returns {Object}
 */
const forgotPassword = async (req) => {
  const [error, result] = await promiseHandler(
    model.getUserBy(req.knex, (db) => {
      db.where('email', req.body.email).where('tenant', req.query.tenant).where('is_deleted',false);
    })
  );

  if (error) {
    const err = new Error(error.detail ?? error.message);
    err.code = error.code ?? HTTP_STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }

  if (!result) {
    const err = new Error(`Please register yourself first`);
    err.code = HTTP_STATUS.BAD_REQUEST;
    throw err;
  }

  const otp = generate(4);

  const { set: setRedis } = createRedisFunctions(req.redis);
  await setRedis(`OTP:${result.email}`, otp, Date.now().HOUR_IN_MS);

  const htmlContent = forgotPasswordTemplate(otp);
  const send = await req.sendEmail({
    to: result.email,
    subject: 'Reset your password',
    text: "Your confirmation code is below - enter it in and we'll help you reset your password.",
    html: htmlContent,
  });

  return {
    code: HTTP_STATUS.OK,
    message: 'Recovery email sent successfully',
    data: null,
  };
};

/**
 * Verify OTP
 * @param {Object} req
 * @returns {Object}
 */
const verifyOtp = async (req) => {
  const { email, otp } = req.body;
  const { tenant } = req.query;

  if (!email || !otp) {
    const err = new Error('Email and OTP are required.');
    err.code = HTTP_STATUS.BAD_REQUEST;
    throw err;
  }

  const { get: getRedis } = createRedisFunctions(req.redis);
  const storedOtp = await getRedis(`OTP:${email}`);

  if (!storedOtp) {
    const err = new Error('OTP has expired or not generated.');
    err.code = HTTP_STATUS.BAD_REQUEST;
    throw err;
  }

  if (storedOtp !== otp) {
    const err = new Error('Invalid OTP.');
    err.code = HTTP_STATUS.BAD_REQUEST;
    throw err;
  }

  const [error, user] = await promiseHandler(
    model.getUserBy(req.knex, (db) => {
      db.where('email', email).where('tenant', tenant).where('is_deleted',false);
    })
  );

  if (error) {
    const err = new Error(error.detail ?? error.message);
    err.code = error.code ?? HTTP_STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }

  if (!user) {
    const err = new Error('User not found.');
    err.code = HTTP_STATUS.BAD_REQUEST;
    throw err;
  }

  return {
    code: HTTP_STATUS.OK,
    message: 'OTP verified successfully. You can now reset your password.',
    data: null,
  };
};

/**
 * Reset Password
 * @param {Object} req
 * @returns {Object}
 */
const resetPassword = async (req) => {
  const { email, otp, newPassword, confirmPassword } = req.body;
  const { tenant } = req.query;

  const [error, user] = await promiseHandler(
    model.getUserBy(req.knex, (db) => {
      db.where('email', email).where('tenant', tenant).where('is_deleted',false);
    })
  );

  if (error) {
    const err = new Error(error.detail ?? error.message);
    err.code = error.code ?? HTTP_STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }

  if (!user) {
    const err = new Error('User not found.');
    err.code = HTTP_STATUS.BAD_REQUEST;
    throw err;
  }

  if (!email || !otp || !newPassword || !confirmPassword) {
    const err = new Error('All fields are required.');
    err.code = HTTP_STATUS.BAD_REQUEST;
    throw err;
  }

  if (newPassword !== confirmPassword) {
    const err = new Error('Passwords do not match.');
    err.code = HTTP_STATUS.BAD_REQUEST;
    throw err;
  }

  const otpVerification = await verifyOtp(req);

  if (otpVerification.code !== HTTP_STATUS.OK) {
    const err = new Error('OTP verification failed.');
    err.code = HTTP_STATUS.BAD_REQUEST;
    throw err;
  }

  const hashedPassword = await req.bcrypt.hash(newPassword);

  const [updateError] = await promiseHandler(
    model.updateUser(req.knex, user.id, { password: hashedPassword })
  );

  if (updateError) {
    const err = new Error(updateError.detail ?? updateError.message);
    err.code = updateError.code ?? HTTP_STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }

  return {
    code: HTTP_STATUS.OK,
    message: 'Password reset successfully.',
    data: null,
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


export default {
  login,
  register,
  forgotPassword,
  verifyOtp,
  resetPassword,
  logout,
};
