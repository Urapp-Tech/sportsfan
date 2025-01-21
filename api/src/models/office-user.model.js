import HTTP_STATUS from "#utilities/http-status";
import MODULE from "#utilities/module-names";
import promiseHandler from "#utilities/promise-handler";

const login = async (req) => {
  const promise = req.knex
    .select("*")
    .from(MODULE.ADMIN.BACK_OFFICE_USER)
    .where((qb) => {
      qb.orWhere("email", req.body.identifier);
      qb.orWhere("phone", req.body.identifier);
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

export default {
  login,
};
