import { input } from "@inquirer/prompts";
import pkg from "bcryptjs";
const { hashSync } = pkg;

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function script(knex) {
  const transaction = await knex.transaction();

  const tenantDomain = await input({ message: "enter tenant domain:  " });
  if (!tenantDomain) {
    throw new Error("tenant domain is required");
  }

  const officeEmail = await input({ message: "enter office email:  " });
  if (!officeEmail) {
    throw new Error("office email is required");
  }

  const userFirstName = await input({ message: "enter user first name:  " });
  if (!userFirstName) {
    throw new Error("first name is required");
  }
  const userLastName = await input({ message: "enter user last name:  " });
  if (!userLastName) {
    throw new Error("last name is required");
  }
  const userEmail = await input({ message: "enter user email:  " });
  if (!userEmail) {
    throw new Error("email is required");
  }
  const userPhone = await input({ message: "enter user phone:  " });
  if (!userPhone) {
    throw new Error("phone is required");
  }

  try {
    const theme = await transaction("theme").where({
      key: "DEFAULT",
    });

    const [tenant] = await transaction("tenant")
      .insert({
        is_active: true,
      })
      .returning("*");

    await transaction("tenant_config")
      .insert({
        tenant: tenant.id,
      })
      .returning("*");

    await transaction("system_config")
      .insert({
        tenant: tenant.id,
        domain: tenantDomain,
        theme: theme[0].id,
        available_themes: JSON.stringify(theme),
      })
      .returning("*");

    const [officeUser] = await transaction("office_user")
      .insert({
        tenant: tenant.id,
        first_name: userFirstName,
        last_name: userLastName,
        password: hashSync("12345678", 12),
        email: userEmail,
        username: userEmail,
        address: "test road abc",
        phone: userPhone,
        user_type: "USER",
      })
      .returning("*");

    const [branch] = await transaction("branch")
      .insert({
        tenant: tenant.id,
        name: "Main",
        mobile: "03001234567",
        landline: "02131234567",
        address: "",
        description: "",
        latitude: 0,
        longitude: 0,
        attendance_distance: 0,
        branch_type: "MAIN",
        is_active: true,
      })
      .returning("*");

    const [role] = await transaction("role")
      .insert({
        tenant: tenant.id,
        name: "ADMINISTRATOR",
        description: "This is manager role",
        is_active: true,
        is_deleted: false,
      })
      .returning("*");

    await transaction("office_user_role")
      .insert({
        office_user: officeUser.id,
        tenant: tenant.id,
        branch: branch.id,
        role: role.id,
        type: "MAIN",
      })
      .returning("*");

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}
