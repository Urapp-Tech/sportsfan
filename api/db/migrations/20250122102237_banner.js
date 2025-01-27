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
    .createTable("banner", (table) => {
      table.uuid("id").primary().defaultTo(knex.fn.uuid());
      table.uuid("tenant").notNullable();
      table.foreign("tenant").references("tenant.id");
      table.uuid("branch").notNullable();
      table.foreign("branch").references("branch.id");
      table.text("title").notNullable();
      table.smallint("sequence");
      table
        .enum("banner_type", ["SPLASH", "ONBOARDING", "BANNER"], {
          useNative: true,
          enumName: "banner_type",
          schemaName: "public",
        })
        .defaultTo("SPLASH");
      table
        .enum("banner_file_type", ["IMAGE", "VIDEO"], {
          useNative: true,
          enumName: "banner_file_type",
          schemaName: "public",
        })
        .defaultTo("IMAGE");
      table.jsonb("fileUrl").nullable();
      table.text("description").nullable();
      table.boolean("is_active").defaultTo(true);
      table.boolean("is_deleted").defaultTo(false);
      table.timestamps(true, true);
      table.unique(["sequence", "banner_type"]);
    })
    .raw(createTriggerUpdateTimestampTrigger("banner"));
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema
    .dropTable("banner")
    .raw(dropType("banner_type"))
    .raw(dropType("banner_file_type"));
}
