import { select } from '@inquirer/prompts';
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // const tenant = 'cdcf8a4c-1b72-4451-8386-315ff610ea34';
  const systemConfig = await knex('system_config').select('tenant', 'domain');
  const tenant = await select({
    message: 'Select a domain',
    choices: systemConfig.map((item) => ({
      name: item.domain,
      value: item.tenant,
    })),
  });
  // id	tenant	name	description	parent	"sequence"	permission_type	is_active	is_deleted	created_at	updated_at
  const [userParent] = await knex('permissions')
    .insert({
      tenant: tenant,
      name: 'User',
      permission_type: 'PARENT',
    })
    .returning('*');

  await knex('permissions').insert([
    {
      tenant: tenant,
      name: 'viewUser',
      parent: userParent.id,
      sequence: 1,
      permission_type: 'CHILD',
    },
    {
      tenant: tenant,
      name: 'addUser',
      parent: userParent.id,
      sequence: 2,
      permission_type: 'CHILD',
    },
    {
      tenant: tenant,
      name: 'editUser',
      parent: userParent.id,
      sequence: 3,
      permission_type: 'CHILD',
    },
    {
      tenant: tenant,
      name: 'deleteUser',
      parent: userParent.id,
      sequence: 4,
      permission_type: 'CHILD',
    },
  ]);
  const [adminParent] = await knex('permissions')
    .insert({
      tenant: tenant,
      name: 'Admin',
      permission_type: 'PARENT',
    })
    .returning('*');

  await knex('permissions').insert([
    {
      tenant: tenant,
      name: 'viewAdminUser',
      parent: adminParent.id,
      sequence: 1,
      permission_type: 'CHILD',
    },
    {
      tenant: tenant,
      name: 'addAdminUser',
      parent: adminParent.id,
      sequence: 2,
      permission_type: 'CHILD',
    },
    {
      tenant: tenant,
      name: 'editAdminUser',
      parent: adminParent.id,
      sequence: 3,
      permission_type: 'CHILD',
    },
    {
      tenant: tenant,
      name: 'deleteAdminUser',
      parent: adminParent.id,
      sequence: 4,
      permission_type: 'CHILD',
    },
  ]);
  const [pageParent] = await knex('permissions')
    .insert({
      tenant: tenant,
      name: 'Page',
      permission_type: 'PARENT',
    })
    .returning('*');

  await knex('permissions').insert([
    {
      tenant: tenant,
      name: 'viewPage',
      parent: pageParent.id,
      sequence: 1,
      permission_type: 'CHILD',
    },
    {
      tenant: tenant,
      name: 'addPage',
      parent: pageParent.id,
      sequence: 2,
      permission_type: 'CHILD',
    },
    {
      tenant: tenant,
      name: 'editPage',
      parent: pageParent.id,
      sequence: 3,
      permission_type: 'CHILD',
    },
    {
      tenant: tenant,
      name: 'deletePage',
      parent: pageParent.id,
      sequence: 4,
      permission_type: 'CHILD',
    },
  ]);
}
