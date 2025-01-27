import { createTriggerUpdateTimestampTrigger } from "../knex.utilities.js";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema
    .createTable("order_items", (table) => {
      table.uuid("id").primary().defaultTo(knex.fn.uuid());
      table.uuid("orders").notNullable();
      table.foreign("orders").references("orders.id");
      table.uuid("products").notNullable();
      table.foreign("products").references("products.id");
      table.double("price").notNullable().defaultTo(0);
      table.smallint("quantity").notNullable().defaultTo(1);
      table.timestamps(true, true);
    })
    .raw(createTriggerUpdateTimestampTrigger("order_items"));
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("order_items");
}
