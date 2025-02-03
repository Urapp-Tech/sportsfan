/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.alterTable('feedback', (table) => {
    table.uuid('users').notNullable();
    table.foreign('users').references('users.id');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.alterTable('feedback', (table) => {
    table.dropColumn('users');
  });
}
