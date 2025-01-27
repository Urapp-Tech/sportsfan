import {
  errorHandler,
  textFilterHelper,
  toUpperSnakeCase,
} from "#utilities/db-query-helpers";
import HTTP_STATUS from "#utilities/http-status";
import MODULE from "#utilities/module-names";
import promiseHandler from "#utilities/promise-handler";

// ROLE SERVICES

const list = async (req, params) => {
  /** @type {import('knex').Knex} */
  const knex = req.knex;
  console.log("params :>> ", params);
  const query = knex
    .from(`${MODULE.ADMIN.ROLE} as role`)
    .where({
      "role.tenant": params.tenant,
      "role.is_deleted": false,
      "role.is_active": true,
    })
    .modify(textFilterHelper(params.search, ["role.name"]))
    .leftJoin(`${MODULE.ADMIN.ROLE_PERMISSION} as rp`, "role.id", "rp.role")
    .select(
      "role.*",
      knex.raw(
        `COALESCE(
          JSON_AGG(DISTINCT rp.permissions) 
          FILTER (WHERE rp.permissions IS NOT NULL AND rp.is_active = true), 
          '[]'
        ) AS permissions`
      )
    )
    .groupBy("role.id")
    .orderBy("role.created_at", "desc")
    .offset(params.page * params.size)
    .limit(params.size);

  const countPromise = knex
    .from(`${MODULE.ADMIN.ROLE} as role`)
    .where({
      "role.tenant": params.tenant,
      "role.is_deleted": false,
      "role.is_active": true,
    })
    .modify(textFilterHelper(params.search, ["role.name"]))
    .countDistinct("role.id as total");

  const [error, result] = await promiseHandler(query);
  const [countError, countResult] = await promiseHandler(countPromise);

  if (error || countError) {
    errorHandler(
      `something went wrong ${error}`,
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }

  if (!result || !countResult) {
    errorHandler(`No role found`, HTTP_STATUS.BAD_REQUEST);
  }

  return {
    list: result.map((row) => ({
      ...row,
      permissions: row.permissions || [],
    })),
    total: Number(countResult[0].total),
  };
};

const create = async (req, params) => {
  const body = req.body;

  /** @type {import('knex').Knex} */
  const knex = req.knex;

  return knex.transaction(async (trx) => {
    try {
      const existing = await trx(MODULE.ADMIN.ROLE)
        .where((builder) => {
          if (body.name) {
            builder
              .where({ name: body.name })
              .andWhere({ tenant: params.tenant })
              .andWhere({ isDeleted: false });
          }
        })
        .first();

      if (existing) {
        errorHandler(`This Role is already registered.`, HTTP_STATUS.FOUND);
        return;
      }

      // Create the role
      const [role] = await trx(MODULE.ADMIN.ROLE)
        .insert({
          name: body.name,
          tenant: params.tenant,
          key: toUpperSnakeCase(body.name),
        })
        .returning("*");

      if (body.permissions && Array.isArray(body.permissions)) {
        const rolePermissions = body.permissions.map((permissionId) => ({
          role: role.id,
          permissions: permissionId,
        }));

        await trx(MODULE.ADMIN.ROLE_PERMISSION).insert(rolePermissions);
      }

      return role;
    } catch (error) {
      // Rollback transaction and handle the error
      errorHandler(
        `Error creating role and assigning permissions: ${error.message}`,
        HTTP_STATUS.BAD_REQUEST
      );
    }
  });
};

const update = async (req, params) => {
  /** @type {import('knex').Knex} */
  const knex = req.knex;
  const body = req.body;

  const { name, permissions } = body;

  return knex.transaction(async (trx) => {
    try {
      const existing = await trx(MODULE.ADMIN.ROLE)
        .where((builder) => {
          if (name) {
            builder
              .where({ name })
              .andWhere({ tenant: params.tenant })
              .andWhere({ isDeleted: false });
          }
        })
        .andWhereNot("id", params.roleId)
        .first();

      if (existing) {
        errorHandler(`This role already exists.`, HTTP_STATUS.BAD_REQUEST);
      }

      const [updatedRole] = await trx(MODULE.ADMIN.ROLE)
        .update({ name })
        .where("id", params.roleId)
        .returning("*");

      if (Array.isArray(permissions)) {
        const existingPermissions = await trx(
          MODULE.ADMIN.ROLE_PERMISSION
        ).where("role", params.roleId);

        const existingPermissionsMap = new Map(
          existingPermissions.map((perm) => [perm.permissions, perm])
        );

        const permissionsSet = new Set(permissions);
        const existingPermissionsSet = new Set(
          existingPermissions.map((perm) => perm.permissions)
        );

        const permissionsToDeactivate = [...existingPermissionsSet].filter(
          (id) => !permissionsSet.has(id)
        );

        await trx(MODULE.ADMIN.ROLE_PERMISSION)
          .where("role", params.roleId)
          .whereIn("permissions", permissionsToDeactivate)
          .update({ is_active: false });

        for (const permissionId of permissions) {
          const existingPermission = existingPermissionsMap.get(permissionId);

          if (existingPermission) {
            await trx(MODULE.ADMIN.ROLE_PERMISSION)
              .where("id", existingPermission.id)
              .update({ is_active: true });
          } else {
            await trx(MODULE.ADMIN.ROLE_PERMISSION).insert({
              role: params.roleId,
              permissions: permissionId,
              is_active: true,
            });
          }
        }
      }

      return updatedRole;
    } catch (error) {
      // Rollback transaction and handle the error
      errorHandler(
        `Error updating role and permissions: ${error.message}`,
        HTTP_STATUS.BAD_REQUEST
      );
    }
  });
};

const deleteRole = async (req, params) => {
  /** @type {import('knex').Knex} */
  const knex = req.knex;

  return knex(MODULE.ADMIN.ROLE)
    .where("id", params.roleId)
    .update({ isDeleted: true });
};

const lov = async (req, params) => {
  /** @type {import('knex').Knex} */
  const knex = req.knex;

  try {
    const roles = await knex
      .select("id", "name")
      .from(MODULE.ADMIN.ROLE)
      .where({ tenant: params.tenant, isDeleted: false, isActive: true })
      .orderBy("name", "asc");

    return roles;
  } catch (error) {
    errorHandler(
      `Error fetching role LOV: ${error.message}`,
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

// PERMISSION SERVICES

const permissionList = async (req, params) => {
  /** @type {import('knex').Knex} */
  const knex = req.knex;

  const query = knex.from(MODULE.ADMIN.PERMISSION).where({
    tenant: params.tenant,
    is_deleted: false,
    is_active: true,
  });

  const countPromise = query.clone().count("* as total");

  const [error, result] = await promiseHandler(query);
  const [countError, countResult] = await promiseHandler(countPromise);

  if (error || countError) {
    errorHandler(`something went wrong`, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }

  if (!result || !countResult) {
    errorHandler(`No permission found`, HTTP_STATUS.BAD_REQUEST);
  }

  return {
    list: result,
    total: Number(countResult[0].total),
  };
};

export default {
  list,
  create,
  update,
  deleteRole,
  lov,
  permissionList,
};
