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
    .createTable('orders', (table) => {
      table.uuid('id').primary().defaultTo(knex.fn.uuid());
      table.uuid('tenant').notNullable();
      table.foreign('tenant').references('tenant.id');
      table.uuid('branch').notNullable();
      table.foreign('branch').references('branch.id');
      table.uuid('users').notNullable();
      table.foreign('users').references('users.id');
      table.text('voucher_code').notNullable();
      table.text('billing_address').notNullable();
      table.text('shipping_address').notNullable();
      table.decimal('gst_percentage', 4, 2).notNullable();
      table.double('gst_amount').notNullable();
      table.double('total_amount').notNullable();
      table.double('discount').notNullable();
      table.double('grand_total').notNullable();
      table.integer('order_number').notNullable();
      table.text('status').notNullable();
      table
        .enum('payment_type', ['ONLINE', 'CASH'], {
          useNative: true,
          enumName: 'payment_type',
          schemaName: 'public',
        })
        .defaultTo('ONLINE');
      table
        .enum('payment_status', ['UNPAID', 'PAID'], {
          useNative: true,
          enumName: 'payment_status',
          schemaName: 'public',
        })
        .defaultTo('UNPAID');
      table.jsonb('fulfillment').nullable();
      table.timestamps(true, true);
    })
    .raw(createTriggerUpdateTimestampTrigger('orders'));
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema
    .dropTable('orders')
    .raw(dropType('payment_type'))
    .raw(dropType('payment_status'));
}
