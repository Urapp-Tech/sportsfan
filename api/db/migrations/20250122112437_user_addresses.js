import {
  createTriggerUpdateTimestampTrigger,
  dropType,
} from "../knex.utilities.js";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema
    .createTable("user_addresses", (table) => {
      table.uuid("id").primary().defaultTo(knex.fn.uuid());
      table.uuid("users").notNullable();
      table.foreign("users").references("users.id");
      table.text("address").notNullable();
      table.text("town").nullable();
      table.text("state").nullable();
      table.text("city").nullable();
      table.text("postal_code").nullable();
      table
        .enum("address_type", ["HOME", "OFFICE"], {
          useNative: true,
          enumName: "address_type",
          schemaName: "public",
        })
        .defaultTo("HOME");
      table.boolean("is_active").defaultTo(true);
      table.boolean("is_deleted").defaultTo(false);
      table.timestamps(true, true);
      table.unique(["users", "address_type"], {
        predicate: knex.whereRaw("is_deleted = false"),
      });
    })
    .raw(createTriggerUpdateTimestampTrigger("user_addresses"));
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("user_addresses").raw(dropType("address_type"));
}
