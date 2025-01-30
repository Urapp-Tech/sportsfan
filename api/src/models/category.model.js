import MODULE from '#utilities/module-names';
import promiseHandler from '#utilities/promise-handler';

const getCategory = async (req) => {
  /** @type {import('knex').Knex} */
  const knex = req.knex;

  const query = knex
    .from(MODULE.ADMIN.CATEGORY)
    .where({
      tenant: req.session.tenant,
      is_deleted: false,
    })
    .first();

  return promiseHandler(query);
};

export default {
  getCategory,
};
