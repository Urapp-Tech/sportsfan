import { createTriggerUpdateTimestampTrigger } from "../knex.utilities.js";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema
    .createTable("role_permissions", (table) => {
      table.uuid("id").primary().defaultTo(knex.fn.uuid());
      table.uuid("role").notNullable();
      table.foreign("role").references("role.id");
      table.uuid("permissions").notNullable();
      table.foreign("permissions").references("permissions.id");
      table.boolean("is_active").defaultTo(true);
      table.timestamps(true, true);
    })
    .raw(createTriggerUpdateTimestampTrigger("role_permissions"));
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("role_permissions");
}
