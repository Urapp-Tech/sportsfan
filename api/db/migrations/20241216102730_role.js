import { createTriggerUpdateTimestampTrigger } from "../knex.utilities.js";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema
    .createTable("role", (table) => {
      table.uuid("id").primary().defaultTo(knex.fn.uuid());
      table.uuid("tenant").notNullable();
      table.foreign("tenant").references("tenant.id");
      table.text("name").nullable();
      table.text("description").nullable();
      table.boolean("is_active").defaultTo(true);
      table.boolean("is_deleted").defaultTo(false);
      table.timestamps(true, true);
    })
    .raw(createTriggerUpdateTimestampTrigger("role"));
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("role");
}
