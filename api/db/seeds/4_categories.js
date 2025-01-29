import { select } from '@inquirer/prompts';
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  const systemConfig = await knex('system_config').select('tenant', 'domain');
  const tenant = await select({
    message: 'Select a domain',
    choices: systemConfig.map((item) => ({
      name: item.domain,
      value: item.tenant,
    })),
  });
  await knex('categories').insert({
    tenant,
    title: 'sport',
  });
}
