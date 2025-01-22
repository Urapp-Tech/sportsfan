import { errorHandler } from "#utilities/db-query-helpers";
import HTTP_STATUS from "#utilities/http-status";
import MODULE from "#utilities/module-names";
import promiseHandler from "#utilities/promise-handler";

const get = async (req, params) => {
  /** @type {import('knex').Knex} */
  const knex = req.knex;

  if (!params.domain) {
    errorHandler(`Domain parameter is missing`, HTTP_STATUS.BAD_REQUEST);
  }
  const promise = knex
    .select(
      `${MODULE.ADMIN.SYSTEM_CONFIG}.*`,
      `tc.logo as tenant_logo`,
      `tc.banner as tenant_banner`
    )
    .leftJoin(
      `${MODULE.ADMIN.TENANT_CONFIG} as tc`,
      "tc.tenant",
      `${MODULE.ADMIN.SYSTEM_CONFIG}.tenant`
    )
    .from(MODULE.ADMIN.SYSTEM_CONFIG)
    .where({
      domain: params.domain,
    })
    .first();
  const [error, result] = await promiseHandler(promise);
  console.log("result :>> ", result, error);
  if (error) {
    errorHandler(`something went wrong`, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
  if (!result) {
    errorHandler(`System config not found`, HTTP_STATUS.BAD_REQUEST);
  }
  return result;
};

export default {
  get,
};
