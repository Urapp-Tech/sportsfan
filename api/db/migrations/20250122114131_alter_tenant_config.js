/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.alterTable("tenant_config", (table) => {
    table.boolean("is_notifications").defaultTo(false);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.alterTable("tenant_config", (table) => {
    table.dropColumn("is_notifications");
  });
}
