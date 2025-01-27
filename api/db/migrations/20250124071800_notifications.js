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
    .createTable('notifications', (table) => {
      table.uuid('id').primary().defaultTo(knex.fn.uuid());
      table.uuid('tenant').notNullable();
      table.foreign('tenant').references('tenant.id');
      table.uuid('branch').notNullable();
      table.foreign('branch').references('branch.id');
      table.text('title').notNullable();
      table.text('description').nullable();
      table.integer('success').defaultTo(0);
      table.integer('failure').defaultTo(0);
      table
        .enum(
          'status',
          ['NEW', 'SENDING', 'COMPLETED', 'FAILED', 'CANCELLED'],
          {
            useNative: true,
            enumName: 'notification_status',
            schemaName: 'public',
          }
        )
        .defaultTo('NEW');

      table.jsonb('success_token').nullable();
      table.jsonb('failure_token').nullable();
      table.boolean('is_active').defaultTo(true);
      table.boolean('is_deleted').defaultTo(false);
      table.timestamps(true, true);
    })
    .raw(createTriggerUpdateTimestampTrigger('notifications'));
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema
    .dropTable('notifications')
    .raw(dropType('notification_status'));
}
