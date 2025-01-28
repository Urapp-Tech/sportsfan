import { errorHandler, textFilterHelper } from '#utilities/db-query-helpers';
import HTTP_STATUS from '#utilities/http-status';
import MODULE from '#utilities/module-names';
import promiseHandler from '#utilities/promise-handler';

const login = async (req) => {
  const promise = req.knex
    .select('*')
    .from(MODULE.ADMIN.OFFICE_USER)
    .where((qb) => {
      qb.orWhere('email', req.body.identifier);
      qb.orWhere('phone', req.body.identifier);
    })
    .first();

  const [error, result] = await promiseHandler(promise);

  if (error) {
    const newError = new Error(`something went wrong`);
    newError.detail = `something went wrong`;
    newError.code = HTTP_STATUS.INTERNAL_SERVER_ERROR;
    throw newError;
  }

  if (!result) {
    const newError = new Error(`No user found`);
    newError.detail = `No user found`;
    newError.code = HTTP_STATUS.BAD_REQUEST;
    throw newError;
  }

  return result;
};

const list = async (req, params) => {
  /** @type {import('knex').Knex} */
  const knex = req.knex;

  const query = knex
    .from(MODULE.ADMIN.OFFICE_USER)
    .leftJoin(
      `${MODULE.ADMIN.OFFICE_USER_ROLE} as our`,
      'office_user.id',
      '=',
      'our.office_user'
    )
    .where({
      'office_user.tenant': params.tenant,
      'office_user.is_deleted': false,
      'office_user.user_type': 'USER',
    })
    .andWhere((qb) => {
      if (params.branch) {
        qb.andWhere('our.branch', params.branch);
      }
    })
    .modify(
      textFilterHelper(params.search, [
        'office_user.first_name',
        'office_user.last_name',
        'office_user.email',
      ])
    );

  const promise = query
    .clone()
    .select('office_user.*')
    .orderBy('office_user.created_at', 'desc')
    .offset(params.page * params.size)
    .limit(params.size);

  const countPromise = query.clone().count('* as total');

  const [error, result] = await promiseHandler(promise);
  const [countError, countResult] = await promiseHandler(countPromise);

  if (error || countError) {
    errorHandler(`something went wrong`, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }

  if (!result || !countResult) {
    errorHandler(`No user found`, HTTP_STATUS.BAD_REQUEST);
  }

  return {
    list: result,
    total: Number(countResult[0].total),
  };
};

const create = async (req, body, params) => {
  /** @type {import('knex').Knex} */
  const knex = req.knex;

  return knex.transaction(async (trx) => {
    try {
      const existingUser = await trx(MODULE.ADMIN.OFFICE_USER)
        .leftJoin(
          `${MODULE.ADMIN.OFFICE_USER_ROLE} as bur`,
          'office_user.id',
          'bur.office_user'
        )
        .where((builder) => {
          if (body.email) builder.orWhere({ 'office_user.email': body.email });
          if (body.phone) builder.orWhere({ 'office_user.phone': body.phone });
        })
        .andWhere({
          'office_user.is_deleted': false,
          'office_user.user_type': 'USER',
          'bur.branch': params.branch,
        })
        .first();

      if (existingUser) {
        errorHandler(
          'The Email / Phone is already registered to another user.',
          HTTP_STATUS.BAD_REQUEST
        );
      }

      const branchRecord = await trx(MODULE.ADMIN.BRANCH)
        .where({ id: params.branch })
        .first();

      if (!branchRecord) {
        errorHandler(`No branch found`, HTTP_STATUS.BAD_REQUEST);
      }

      const newPassword = await hashAsync(body.password);

      const branchType = branchRecord.branchType === 'MAIN' ? 'MAIN' : 'OTHER';

      const [officeUser] = await trx(MODULE.ADMIN.BACK_OFFICE_USER)
        .insert({
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          username: body.email,
          password: newPassword,
          phone: body.phone,
          address: body.address,
          tenant: params.tenant,
          userType: body.userType,
          avatar: body.avatar,
        })
        .returning('*');

      await trx(MODULE.ADMIN.OFFICE_USER_ROLE).insert({
        tenant: params.tenant,
        branch: params.branch,
        officeUser: officeUser.id,
        role: body.role,
        type: branchType,
      });

      return officeUser;
    } catch (error) {
      errorHandler(
        `Error creating officeUser: ${error.message}`,
        HTTP_STATUS.BAD_REQUEST
      );
    }
  });
};

const update = async (req, body, params) => {
  const { email, phone } = body;

  /** @type {import('knex').Knex} */
  const knex = req.knex;

  const existingUser = await knex(MODULE.ADMIN.BACK_OFFICE_USER)
    .leftJoin(
      `${MODULE.ADMIN.BACK_OFFICE_USER_TENANT_BRANCH} as butb`,
      'back_Office_user.id',
      'butb.back_Office_user'
    )
    .where((builder) => {
      if (email) builder.orWhere({ 'back_Office_user.email': email });
      if (phone) builder.orWhere({ 'back_Office_user.phone': phone });
    })
    .andWhere({
      'back_Office_user.is_deleted': false,
      'back_Office_user.user_type': 'USER',
      'butb.branch': params.branch,
    })
    .andWhereNot('back_Office_user.id', params.userId)
    .first();

  if (existingUser) {
    errorHandler(
      `An employee with the email / phone already exists.`,
      HTTP_STATUS.BAD_REQUEST
    );
  }

  const [updatedEmployee] = await knex(MODULE.ADMIN.BACK_OFFICE_USER)
    .update(body)
    .where('id', params.userId)
    .returning('*');

  return updatedEmployee;
};

const deleteUser = async (req, params) => {
  /** @type {import('knex').Knex} */
  const knex = req.knex;

  return knex(MODULE.ADMIN.BACK_OFFICE_USER)
    .where('id', params.userId)
    .update({ isDeleted: true });
};

export default {
  login,
  list,
  create,
  update,
  deleteUser,
};
