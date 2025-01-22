import { textFilterHelper } from "#utilities/db-query-helpers";
import HTTP_STATUS from "#utilities/http-status";
import MODULE from "#utilities/module-names";
import promiseHandler from "#utilities/promise-handler";

const list = async (req, params) => {
  /** @type {import('knex').Knex} */
  const knex = req.knex;

  console.log("params :>> ", params);

  //   const query = knex
  //     .from(MODULE.ADMIN.ro)
  //     .leftJoin(
  //       `${MODULE.ADMIN.OFFICE_USER_ROLE} as our`,
  //       "office_user.id",
  //       "=",
  //       "our.office_user"
  //     )
  //     .where({
  //       "office_user.tenant": params.tenant,
  //       "office_user.is_deleted": false,
  //       "office_user.user_type": "USER",
  //     })
  //     .andWhere((qb) => {
  //       if (params.branch) {
  //         qb.andWhere("our.branch", params.branch);
  //       }
  //     })
  //     .modify(
  //       textFilterHelper(params.search, [
  //         "office_user.first_name",
  //         "office_user.last_name",
  //         "office_user.email",
  //       ])
  //     );

  //   const promise = query
  //     .clone()
  //     .select("office_user.*")
  //     .orderBy("office_user.created_at", "desc")
  //     .offset(params.page * params.size)
  //     .limit(params.size);

  //   const countPromise = query.clone().count("* as total");

  //   const [error, result] = await promiseHandler(promise);
  //   const [countError, countResult] = await promiseHandler(countPromise);

  //   if (error || countError) {
  //     errorHandler(`something went wrong`, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  //   }

  //   if (!result || !countResult) {
  //     errorHandler(`No user found`, HTTP_STATUS.BAD_REQUEST);
  //   }

  //   return {
  //     list: result,
  //     total: Number(countResult[0].total),
  //   };
};

export default {
  list,
};
