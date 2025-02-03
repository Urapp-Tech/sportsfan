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
    .from(MODULE.ADMIN.FEEDBACK)
    .where({
      'feedback.tenant': req.session.tenant,
      'feedback.is_deleted': false,
    })
    .modify(textFilterHelper(req.query.search, ['subject']));

  const promise = query
    .clone()
    .select([
      'feedback.*',
      knex.raw(jsonBuildObject(`${MODULE.ADMIN.USER}`, [], 'user')),
    ])
    .leftJoin(`${MODULE.ADMIN.USER} as usr`, 'feedback.users', 'usr.id')
    .groupBy('feedback.id')
    .orderBy('feedback.created_at', 'desc')
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

  return knex(MODULE.ADMIN.FEEDBACK)
    .select([
      'feedback.*',
      knex.raw(jsonBuildObject(`${MODULE.ADMIN.USER}`, [], 'user')),
    ])
    .where({
      'feedback.id': req.params.id,
    })
    .leftJoin(`${MODULE.ADMIN.USER} as usr`, 'feedback.users', 'usr.id')
    .groupBy('feedback.id')
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

// const update = async (req, body) => {
//   /** @type {import('knex').Knex} */
//   const knex = req.knex;
//   const data = body;
//   const newData = {
//     ...data,
//     updated_at: new Date(),
//   };
//   const [updatedPage] = await knex(MODULE.ADMIN.FEEDBACK)
//     .update(newData)
//     .where('id', req.params.id)
//     .returning('*');

//   return updatedPage;
// };

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
  // update,
  deleteRecord,
};
