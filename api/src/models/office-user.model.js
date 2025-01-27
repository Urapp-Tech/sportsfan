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

export default {
  login,
  list,
};
