import { errorHandler, textFilterHelper } from '#utilities/db-query-helpers';
import HTTP_STATUS from '#utilities/http-status';
import promiseHandler from '#utilities/promise-handler';

/**
 * Fetches a single record based on conditions.
 * @param  {import('knex').Knex} knex - Knex instance.
 * @param {string} table - Table name.
 * @param {Object|Function} conditions - Query conditions or a callback.
 * @returns {Promise<Object|null>} - The found record or null.
 */
const findOne = async (knex, table, conditions) => {
  const promise = knex
    .select('*')
    .from(table)
    .where((qb) => {
      if (typeof conditions === 'function') {
        conditions(qb);
      } else {
        qb.where(conditions);
      }
    })
    .first();

  const [error, result] = await promiseHandler(promise);
  if (error) {
    errorHandler(`Something went wrong`, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
  return result || null;
};

/**
 * Retrieves paginated records with optional filters.
 * @param {import('knex').Knex} knex - Knex instance.
 * @param {string} table - Table name.
 * @param {Object} params - Query parameters (conditions, pagination, sorting).
 * @param {string[]} filters - Searchable columns.
 * @returns {Promise<Object>} - List of records and total count.
 */
const findAll = async (knex, table, params, filters = []) => {
  const query = knex.from(table).where(params.conditions);
  if (filters.length) query.modify(textFilterHelper(params.search, filters));

  const promise = query
    .clone()
    .select('*')
    .orderBy(params.orderBy || 'created_at', 'desc')
    .offset(params.page * params.size)
    .limit(params.size);

  const countPromise = query.clone().count('* as total');

  const [error, result] = await promiseHandler(promise);
  const [countError, countResult] = await promiseHandler(countPromise);

  if (error || countError) {
    errorHandler(`Something went wrong`, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
  return {
    list: result || [],
    total: countResult ? Number(countResult[0].total) : 0,
  };
};

/**
 * Inserts a new record and returns it.
 * @param {import('knex').Knex} knex - Knex instance.
 * @param {string} table - Table name.
 * @param {Object} data - Data to insert.
 * @returns {Promise<Object|null>} - Created record or null.
 */
const create = async (knex, table, data) => {
  return knex.transaction(async (trx) => {
    try {
      const [record] = await trx(table).insert(data).returning('*');
      return record || null;
    } catch (error) {
      errorHandler(
        `Error creating record: ${error.message}`,
        HTTP_STATUS.BAD_REQUEST
      );
    }
  });
};

/**
 * Updates a record and returns the updated data.
 * @param {import('knex').Knex} knex - Knex instance.
 * @param {string} table - Table name.
 * @param {Object} conditions - Query conditions.
 * @param {Object} data - Data to update.
 * @returns {Promise<Object|null>} - Updated record or null.
 */
const update = async (knex, table, conditions, data) => {
  const [updatedRecord] = await knex(table)
    .update(data)
    .where(conditions)
    .returning('*');
  return updatedRecord || null;
};

/**
 * Soft deletes a record by setting `isDeleted` to true.
 * @param {import('knex').Knex} knex - Knex instance.
 * @param {string} table - Table name.
 * @param {Object} conditions - Query conditions.
 * @returns {Promise<boolean>} - True if a record was deleted, otherwise false.
 */
const remove = async (knex, table, conditions) => {
  const affectedRows = await knex(table)
    .where(conditions)
    .update({ isDeleted: true });
  return affectedRows > 0;
};

export default {
  findOne,
  findAll,
  create,
  update,
  remove,
};
