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
    .createTable("office_user", (table) => {
      table.uuid("id").primary().defaultTo(knex.fn.uuid());
      table.uuid("tenant").nullable();
      table.foreign("tenant").references("tenant.id");
      table.text("first_name").nullable();
      table.text("last_name").nullable();
      table.text("username").notNullable();
      table.text("email").notNullable();
      table.text("password").notNullable();
      table.text("phone").nullable();
      table.text("country").nullable();
      table.text("state").nullable();
      table.text("city").nullable();
      table.text("zip_code").nullable();
      table.text("avatar").nullable();
      table.text("address").nullable();
      table
        .enum("user_type", ["SUPER_USER", "USER"], {
          useNative: true,
          enumName: "office_user_type",
          schemaName: "public",
        })
        .defaultTo("USER");
      table.boolean("is_active").defaultTo(true);
      table.boolean("is_deleted").defaultTo(false);
      table.timestamps(true, true);
      table.unique(["email"], {
        predicate: knex.whereRaw("is_deleted = false"),
      });
      table.unique(["phone"], {
        predicate: knex.whereRaw("is_deleted = false"),
      });
    })
    .raw(createTriggerUpdateTimestampTrigger("office_user"));
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("office_user").raw(dropType("office_user_type"));
}
