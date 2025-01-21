import { createTriggerUpdateTimestampTrigger } from "../knex.utilities.js";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema
    .createTable("tenant_config", (table) => {
      table.uuid("id").primary().defaultTo(knex.fn.uuid());
      table.uuid("tenant").notNullable();
      table.foreign("tenant").references("tenant.id");
      table.text("logo").nullable();
      table.text("banner").nullable();
      table.jsonb("media").nullable();
      table.timestamps(true, true);
      table.unique(["tenant"]);
    })
    .raw(createTriggerUpdateTimestampTrigger("tenant_config"));
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("tenant_config");
}
