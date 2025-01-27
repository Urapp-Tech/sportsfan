import { createTriggerUpdateTimestampTrigger } from "../knex.utilities.js";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema
    .createTable("order_statuses", (table) => {
      table.uuid("id").primary().defaultTo(knex.fn.uuid());
      table.uuid("orders").notNullable();
      table.foreign("orders").references("orders.id");
      table.uuid("users").notNullable();
      table.foreign("users").references("users.id");
      table.text("status").notNullable();
      table.timestamps(true, true);
    })
    .raw(createTriggerUpdateTimestampTrigger("order_statuses"));
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("order_statuses");
}
