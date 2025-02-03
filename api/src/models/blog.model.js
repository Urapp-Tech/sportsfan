import { errorHandler, textFilterHelper } from '#utilities/db-query-helpers';
import HTTP_STATUS from '#utilities/http-status';
import MODULE from '#utilities/module-names';
import promiseHandler from '#utilities/promise-handler';

const list = async (req) => {
  /** @type {import('knex').Knex} */
  const knex = req.knex;

  const query = knex
    .from(MODULE.ADMIN.BLOG)
    .where({
      tenant: req.user.tenant,
      branch: req.user.branch,
      is_deleted: false,
    })
    .modify(textFilterHelper(req.query.search, ['title']));

  const promise = query
    .clone()
    .select('*')
    .orderBy('created_at', 'desc')
    .offset(req.query.page * req.query.size)
    .limit(req.query.size);

  const countPromise = query.clone().count('* as total');

  const [error, result] = await promiseHandler(promise);
  const [countError, countResult] = await promiseHandler(countPromise);

  if (error || countError) {
    errorHandler(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }

  if (!result || !countResult) {
    errorHandler(`No page found`, HTTP_STATUS.BAD_REQUEST);
  }

  return {
    list: result,
    total: Number(countResult[0].total),
  };
};

const create = async (req, body) => {
  /** @type {import('knex').Knex} */
  const knex = req.knex;
  const data = body;
  const newData = {
    ...data,
    tenant: req.user.tenant,
    branch: req.user.branch,
  };
  const [createdPage] = await knex(MODULE.ADMIN.BLOG)
    .insert(newData)
    .returning('*');

  return createdPage;
};

const update = async (req, body) => {
  console.log('BODY', body);

  /** @type {import('knex').Knex} */
  const knex = req.knex;
  const data = body;
  const newData = {
    ...data,
    images: JSON.stringify(body.images),
    updated_at: new Date(),
  };
  const [updatedPage] = await knex(MODULE.ADMIN.BLOG)
    .update(newData)
    .where('id', req.params.id)
    .returning('*');

  return updatedPage;
};

const deleteRecord = async (req, params) => {
  /** @type {import('knex').Knex} */
  const knex = req.knex;

  return knex(MODULE.ADMIN.BLOG)
    .where('id', params.id)
    .update({ isDeleted: true });
};

const findById = async (req) => {
  /** @type {import('knex').Knex} */
  const knex = req.knex;
  return knex(MODULE.ADMIN.BLOG)
    .select('images')
    .where({ id: req.params.id })
    .first();
};

export default {
  list,
  create,
  update,
  deleteRecord,
  findById,
};
