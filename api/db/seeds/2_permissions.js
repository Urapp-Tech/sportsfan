/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // id	tenant	name	description	parent	"sequence"	permission_type	is_active	is_deleted	created_at	updated_at
  const [userParent] = await knex("permissions")
    .insert({
      tenant: "50a3ed23-6d5c-4dc1-b40d-274793f6b255",
      name: "User",
      permission_type: "PARENT",
    })
    .returning("*");

  await knex("permissions").insert([
    {
      tenant: "50a3ed23-6d5c-4dc1-b40d-274793f6b255",
      name: "viewUser",
      parent: userParent.id,
      sequence: 1,
      permission_type: "CHILD",
    },
    {
      tenant: "50a3ed23-6d5c-4dc1-b40d-274793f6b255",
      name: "editUser",
      parent: userParent.id,
      sequence: 2,
      permission_type: "CHILD",
    },
    {
      tenant: "50a3ed23-6d5c-4dc1-b40d-274793f6b255",
      name: "deleteUser",
      parent: userParent.id,
      sequence: 3,
      permission_type: "CHILD",
    },
  ]);
  const [adminParent] = await knex("permissions")
    .insert({
      tenant: "50a3ed23-6d5c-4dc1-b40d-274793f6b255",
      name: "Admin",
      permission_type: "PARENT",
    })
    .returning("*");

  await knex("permissions").insert([
    {
      tenant: "50a3ed23-6d5c-4dc1-b40d-274793f6b255",
      name: "viewAdminUser",
      parent: adminParent.id,
      sequence: 1,
      permission_type: "CHILD",
    },
    {
      tenant: "50a3ed23-6d5c-4dc1-b40d-274793f6b255",
      name: "editAdminUser",
      parent: adminParent.id,
      sequence: 2,
      permission_type: "CHILD",
    },
    {
      tenant: "50a3ed23-6d5c-4dc1-b40d-274793f6b255",
      name: "deleteAdminUser",
      parent: adminParent.id,
      sequence: 3,
      permission_type: "CHILD",
    },
  ]);
  const [pageParent] = await knex("permissions")
    .insert({
      tenant: "50a3ed23-6d5c-4dc1-b40d-274793f6b255",
      name: "Page",
      permission_type: "PARENT",
    })
    .returning("*");

  await knex("permissions").insert([
    {
      tenant: "50a3ed23-6d5c-4dc1-b40d-274793f6b255",
      name: "viewPage",
      parent: pageParent.id,
      sequence: 1,
      permission_type: "CHILD",
    },
    {
      tenant: "50a3ed23-6d5c-4dc1-b40d-274793f6b255",
      name: "editPage",
      parent: pageParent.id,
      sequence: 2,
      permission_type: "CHILD",
    },
    {
      tenant: "50a3ed23-6d5c-4dc1-b40d-274793f6b255",
      name: "deletePage",
      parent: pageParent.id,
      sequence: 3,
      permission_type: "CHILD",
    },
  ]);
}
