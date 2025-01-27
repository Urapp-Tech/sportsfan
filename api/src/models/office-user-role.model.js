import HTTP_STATUS from '#utilities/http-status';
import MODULE from '#utilities/module-names';
import promiseHandler from '#utilities/promise-handler';

const officeUserRole = async (req, officeUser) => {
  const knex = req.knex;
  const promise = req.knex
    .select(['our.*', knex.raw(`json_agg(role.*)-> 0 as role`)])
    .from(`${MODULE.ADMIN.OFFICE_USER_ROLE} as our`)
    .leftJoin(`${MODULE.ADMIN.ROLE} as role`, 'our.role', '=', 'role.id')
    .where({
      'our.office_user': officeUser,
    })
    .groupBy('our.id')
    .first();

  const [error, result] = await promiseHandler(promise);

  if (error) {
    const newError = new Error(error);
    newError.detail = newError.message;
    newError.code = HTTP_STATUS.INTERNAL_SERVER_ERROR;
    throw newError;
  }

  if (!result) {
    const newError = new Error(`No office user role found`);
    newError.detail = newError.message;
    newError.code = HTTP_STATUS.BAD_REQUEST;
    throw newError;
  }

  return result;
};

export default {
  officeUserRole,
};
