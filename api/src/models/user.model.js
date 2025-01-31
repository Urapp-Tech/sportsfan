import dbHelper from '#utilities/db-helper';
import MODULE from '#utilities/module-names';

const table = MODULE.ADMIN.USER;

const getUserBy = async (knex, conditions) => {
  return await dbHelper.findOne(knex, table, conditions);
};

const listUsers = async (knex, params) => {
  return await dbHelper.findAll(knex, table, params, ['first_name', 'last_name', 'email']);
};

const createUser = async (knex, data) => {
  return await dbHelper.create(knex, table, data);
};

const updateUser = async (knex, userId, data) => {
  return await dbHelper.update(knex, table, { id: userId }, data);
};

const deleteUser = async (knex, userId) => {
  return await dbHelper.remove(knex, table, { id: userId });
};

export default {
  listUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserBy,
};
