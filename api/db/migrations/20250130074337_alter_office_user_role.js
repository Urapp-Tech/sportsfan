import { dropTriggerUpdateTimestampTrigger } from '../knex.utilities.js';
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.raw(dropTriggerUpdateTimestampTrigger('office_user_role'));
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {}
