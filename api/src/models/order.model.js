import {
  errorHandler,
  jsonBuildObject,
  textFilterHelper,
} from '#utilities/db-query-helpers';
import HTTP_STATUS from '#utilities/http-status';
import MODULE from '#utilities/module-names';
import promiseHandler from '#utilities/promise-handler';

const list = async (req) => {
  /** @type {import('knex').Knex} */
  const knex = req.knex;

  const query = knex
    .from(MODULE.ADMIN.ORDER)
    .where({
      'orders.tenant': req.session.tenant,
      'orders.branch': req.session.branch,
      'orders.is_deleted': false,
    })
    .modify(textFilterHelper(req.query.search, ['order_number']));

  const promise = query
    .clone()
    .select([
      'orders.*',
      knex.raw(
        `'ORD'::text || LPAD(orders.order_number::text, 8, '0'::text) AS order_number`
      ),
      knex.raw(jsonBuildObject(`${MODULE.ADMIN.USER}`, [], 'user')),
      knex.raw(
        `
        (
        SELECT
        COALESCE(JSON_AGG(inner_query.*), '[]')
        FROM
        (SELECT DISTINCT ON (status) * FROM order_statuses WHERE order_statuses.orders = orders.id) as inner_query
        ) AS order_statuses
        `
      ),
    ])
    .leftJoin(`${MODULE.ADMIN.USER} as usr`, 'orders.users', 'usr.id')
    .groupBy('orders.id')
    .orderBy('orders.created_at', 'desc')
    .offset(req.query.page * req.query.size)
    .limit(req.query.size);

  const countPromise = query.clone().count('* as total');

  const [error, result] = await promiseHandler(promise);
  const [countError, countResult] = await promiseHandler(countPromise);

  if (error || countError) {
    errorHandler(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }

  if (!result || !countResult) {
    errorHandler(`No feedback found`, HTTP_STATUS.BAD_REQUEST);
  }

  return {
    list: result,
    total: Number(countResult[0].total),
  };
};

const detail = (req) => {
  /** @type {import('knex').Knex} */
  const knex = req.knex;

  return knex
    .select([
      'orders.*',
      knex.raw(
        `'ORD'::text || LPAD(orders.order_number::text, 8, '0'::text) AS order_number`
      ),
      knex.raw(jsonBuildObject(`${MODULE.ADMIN.USER}`, [], 'user')),
      knex.raw(
        `
      (
      SELECT
      COALESCE(JSON_AGG(inner_query.*), '[]')
      FROM
      (SELECT DISTINCT ON (status) * FROM order_statuses WHERE order_statuses.orders = orders.id) as inner_query
      ) AS order_statuses
      `
      ),
    ])
    .from(MODULE.ADMIN.ORDER)
    .leftJoin(`${MODULE.ADMIN.USER} as usr`, 'orders.users', 'usr.id')
    .groupBy('orders.id')
    .where({
      'orders.id': req.params.id,
    })
    .first();
};

const create = async (req, data) => {
  /** @type {import('knex').Knex} */
  const knex = req.knex;

  const [createdPage] = await knex(MODULE.ADMIN.FEEDBACK)
    .insert(data)
    .returning('*');

  return createdPage;
};

const deleteRecord = async (req, params) => {
  /** @type {import('knex').Knex} */
  const knex = req.knex;

  return knex(MODULE.ADMIN.FEEDBACK)
    .where('id', params.id)
    .update({ isDeleted: true });
};

export default {
  list,
  detail,
  create,
  deleteRecord,
};
