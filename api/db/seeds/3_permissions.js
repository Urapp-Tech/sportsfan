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
  await (async () => {
    const [parent] = await knex('permissions')
      .insert({
        tenant: tenant,
        name: 'Role',
        permission_type: 'PARENT',
      })
      .returning('*');

    await knex('permissions').insert([
      {
        tenant: tenant,
        name: 'addRole',
        parent: parent.id,
        sequence: 1,
        permission_type: 'CHILD',
      },
      {
        tenant: tenant,
        name: 'viewRole',
        parent: parent.id,
        sequence: 2,
        permission_type: 'CHILD',
      },
      {
        tenant: tenant,
        name: 'editRole',
        parent: parent.id,
        sequence: 3,
        permission_type: 'CHILD',
      },
      {
        tenant: tenant,
        name: 'deleteRole',
        parent: parent.id,
        sequence: 4,
        permission_type: 'CHILD',
      },
    ]);
  })();
  await (async () => {
    const [parent] = await knex('permissions')
      .insert({
        tenant: tenant,
        name: 'Notification',
        permission_type: 'PARENT',
      })
      .returning('*');

    await knex('permissions').insert([
      {
        tenant: tenant,
        name: 'viewNotification',
        parent: parent.id,
        sequence: 1,
        permission_type: 'CHILD',
      },
      {
        tenant: tenant,
        name: 'addNotification',
        parent: parent.id,
        sequence: 2,
        permission_type: 'CHILD',
      },
    ]);
  })();
  await (async () => {
    const [parent] = await knex('permissions')
      .insert({
        tenant: tenant,
        name: 'Blog',
        permission_type: 'PARENT',
      })
      .returning('*');

    await knex('permissions').insert([
      {
        tenant: tenant,
        name: 'viewBlog',
        parent: parent.id,
        sequence: 1,
        permission_type: 'CHILD',
      },
      {
        tenant: tenant,
        name: 'addBlog',
        parent: parent.id,
        sequence: 2,
        permission_type: 'CHILD',
      },
      {
        tenant: tenant,
        name: 'editBlog',
        parent: parent.id,
        sequence: 3,
        permission_type: 'CHILD',
      },
      {
        tenant: tenant,
        name: 'deleteBlog',
        parent: parent.id,
        sequence: 4,
        permission_type: 'CHILD',
      },
    ]);
  })();
  await (async () => {
    const [parent] = await knex('permissions')
      .insert({
        tenant: tenant,
        name: 'Banner',
        permission_type: 'PARENT',
      })
      .returning('*');

    await knex('permissions').insert([
      {
        tenant: tenant,
        name: 'viewBanner',
        parent: parent.id,
        sequence: 1,
        permission_type: 'CHILD',
      },
      {
        tenant: tenant,
        name: 'addBanner',
        parent: parent.id,
        sequence: 2,
        permission_type: 'CHILD',
      },
      {
        tenant: tenant,
        name: 'editBanner',
        parent: parent.id,
        sequence: 3,
        permission_type: 'CHILD',
      },
      {
        tenant: tenant,
        name: 'deleteBanner',
        parent: parent.id,
        sequence: 4,
        permission_type: 'CHILD',
      },
    ]);
  })();
  await (async () => {
    const [parent] = await knex('permissions')
      .insert({
        tenant: tenant,
        name: 'Product',
        permission_type: 'PARENT',
      })
      .returning('*');

    await knex('permissions').insert([
      {
        tenant: tenant,
        name: 'viewProduct',
        parent: parent.id,
        sequence: 1,
        permission_type: 'CHILD',
      },
      {
        tenant: tenant,
        name: 'addProduct',
        parent: parent.id,
        sequence: 2,
        permission_type: 'CHILD',
      },
      {
        tenant: tenant,
        name: 'editProduct',
        parent: parent.id,
        sequence: 3,
        permission_type: 'CHILD',
      },
      {
        tenant: tenant,
        name: 'deleteProduct',
        parent: parent.id,
        sequence: 4,
        permission_type: 'CHILD',
      },
    ]);
  })();
  await (async () => {
    const [parent] = await knex('permissions')
      .insert({
        tenant: tenant,
        name: 'Order',
        permission_type: 'PARENT',
      })
      .returning('*');

    await knex('permissions').insert([
      {
        tenant: tenant,
        name: 'viewOrder',
        parent: parent.id,
        sequence: 1,
        permission_type: 'CHILD',
      },
      {
        tenant: tenant,
        name: 'updateOrder',
        parent: parent.id,
        sequence: 2,
        permission_type: 'CHILD',
      },
      {
        tenant: tenant,
        name: 'cancelOrder',
        parent: parent.id,
        sequence: 3,
        permission_type: 'CHILD',
      },
      {
        tenant: tenant,
        name: 'deleteOrder',
        parent: parent.id,
        sequence: 4,
        permission_type: 'CHILD',
      },
    ]);
  })();
  // await (async () => {
  //   await knex('permissions').insert([
  //     {
  //       tenant: tenant,
  //       name: 'addUser',
  //       parent: '5ee047e8-6d4f-4332-8496-eb258abb4677',
  //       sequence: 2,
  //       permission_type: 'CHILD',
  //     },
  //     {
  //       tenant: tenant,
  //       name: 'addAdminUser',
  //       parent: '15491321-5a25-4988-8a10-52e586014684',
  //       sequence: 2,
  //       permission_type: 'CHILD',
  //     },
  //     {
  //       tenant: tenant,
  //       name: 'addPage',
  //       parent: 'eef654d6-3e6a-4e84-8744-68d0dfec2051',
  //       sequence: 2,
  //       permission_type: 'CHILD',
  //     },
  //   ]);
  // })();
}
