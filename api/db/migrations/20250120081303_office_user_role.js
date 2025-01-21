import { createTriggerUpdateTimestampTrigger } from "../knex.utilities.js";
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema
    .createTable("office_user_role", (table) => {
      table.uuid("id").primary().defaultTo(knex.fn.uuid());
      table.uuid("office_user").notNullable();
      table.foreign("office_user").references("office_user.id");
      table.uuid("tenant").notNullable();
      table.foreign("tenant").references("tenant.id");
      table.uuid("branch").notNullable();
      table.foreign("branch").references("branch.id");
      table.uuid("role").notNullable();
      table.foreign("role").references("role.id");
      table
        .enum("type", ["MAIN", "OTHER"], {
          useNative: true,
          existingType: true,
          enumName: "branch_type",
          schemaName: "public",
        })
        .defaultTo("OTHER");
    })
    .raw(createTriggerUpdateTimestampTrigger("office_user_role"));
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("office_user_role");
}
