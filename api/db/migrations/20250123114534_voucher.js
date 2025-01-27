import {
  createTriggerUpdateTimestampTrigger,
  dropType,
} from '../knex.utilities.js';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema
    .createTable('voucher', (table) => {
      table.uuid('id').primary().defaultTo(knex.fn.uuid());
      table.uuid('tenant').notNullable();
      table.foreign('tenant').references('tenant.id');
      table.text('code').notNullable();
      table.smallint('amount').notNullable();
      table.smallint('minimum_spent').notNullable();
      table
        .enum('status', ['INACTIVE', 'ACTIVE', 'EXPIRED'], {
          useNative: true,
          enumName: 'voucher_status',
          schemaName: 'public',
        })
        .defaultTo('INACTIVE');
      table.jsonb('branches').nullable();
      table.timestamp('valid_from');
      table.timestamp('valid_till');
      table.boolean('is_deleted').defaultTo(false);
      table.timestamps(true, true);
    })
    .raw(createTriggerUpdateTimestampTrigger('voucher'));
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('voucher').raw(dropType('voucher_status'));
}
