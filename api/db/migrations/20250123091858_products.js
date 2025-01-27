import { createTriggerUpdateTimestampTrigger } from "../knex.utilities.js";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema
    .createTable("products", (table) => {
      table.uuid("id").primary().defaultTo(knex.fn.uuid());
      table.uuid("tenant").notNullable();
      table.foreign("tenant").references("tenant.id");
      table.uuid("categories").notNullable();
      table.foreign("categories").references("categories.id");
      table.text("title").notNullable();
      table.double("price").defaultTo(0);
      table.double("discounted_price").defaultTo(0);
      table.text("icon").nullable();
      table.text("short_description").nullable();
      table.text("detail_description").nullable();
      table.jsonb("images").nullable();
      table.boolean("is_active").defaultTo(true);
      table.boolean("is_deleted").defaultTo(false);
      table.timestamps(true, true);
      table.unique(["tenant", "categories", "title"], {
        predicate: knex.whereRaw("is_deleted = false"),
      });
    })
    .raw(createTriggerUpdateTimestampTrigger("products"));
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("products");
}
