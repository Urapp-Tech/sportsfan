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
    .createTable("permissions", (table) => {
      table.uuid("id").primary().defaultTo(knex.fn.uuid());
      table.uuid("tenant").notNullable();
      table.foreign("tenant").references("tenant.id");
      table.text("name").notNullable();
      table.text("description").nullable();
      table.uuid("parent").nullable();
      table.foreign("parent").references("permissions.id");
      table.smallint("sequence");
      table
        .enum("permission_type", ["PARENT", "CHILD"], {
          useNative: true,
          enumName: "permission_type",
          schemaName: "public",
        })
        .defaultTo("PARENT");
      table.boolean("is_active").defaultTo(true);
      table.boolean("is_deleted").defaultTo(false);
      table.timestamps(true, true);
      table.unique(["name"], {
        predicate: knex.whereRaw("is_deleted = false"),
      });
      table.unique(["sequence", "parent"]);
    })
    .raw(createTriggerUpdateTimestampTrigger("permissions"));
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("permissions").raw(dropType("permission_type"));
}
