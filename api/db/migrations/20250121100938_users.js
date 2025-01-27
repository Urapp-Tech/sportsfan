import { createTriggerUpdateTimestampTrigger } from "../knex.utilities.js";
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.uuid("id").primary().defaultTo(knex.fn.uuid());
      table.uuid("tenant").notNullable();
      table.foreign("tenant").references("tenant.id");
      table.text("username").notNullable();
      table.text("email").notNullable();
      table.text("password").notNullable();
      table.text("first_name").nullable();
      table.text("last_name").nullable();
      table.timestamp("dob").nullable();
      table.text("phone").nullable();
      table.uuid("team").nullable();
      table.text("avatar").nullable();
      table.boolean("interested_gambling").defaultTo(false);
      table.boolean("is_active").defaultTo(true);
      table.boolean("is_deleted").defaultTo(false);
      table.timestamps(true, true);
      table.unique(["tenant", "email"], {
        predicate: knex.whereRaw("is_deleted = false"),
      });
      table.unique(["tenant", "phone"], {
        predicate: knex.whereRaw("is_deleted = false"),
      });
    })
    .raw(createTriggerUpdateTimestampTrigger("users"));
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("users");
}
