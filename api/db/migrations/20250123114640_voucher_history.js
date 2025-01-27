import { createTriggerUpdateTimestampTrigger } from "../knex.utilities.js";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema
    .createTable("voucher_history", (table) => {
      table.uuid("id").primary().defaultTo(knex.fn.uuid());
      table.uuid("tenant").notNullable();
      table.foreign("tenant").references("tenant.id");
      table.uuid("voucher").notNullable();
      table.foreign("voucher").references("voucher.id");
      table.uuid("users").notNullable();
      table.foreign("users").references("users.id");
      table.uuid("orders").notNullable();
      table.foreign("orders").references("orders.id");
      table.timestamps(true, true);
    })
    .raw(createTriggerUpdateTimestampTrigger("voucher_history"));
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("voucher_history");
}
