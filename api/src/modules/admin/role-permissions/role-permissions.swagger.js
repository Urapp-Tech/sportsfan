import { Type } from "@sinclair/typebox";

const swagger = {
  list: {
    schema: {
      description: `this will list roles`,
      tags: ["ADMIN|RolePermission"],
      summary: `role with pagination`,
      operationId: "FetchRole",
      querystring: Type.Object(
        {
          page: Type.Integer({ default: 0, minimum: 0 }),
          size: Type.Integer({ default: 10, minimum: 10 }),
          search: Type.Optional(Type.String()),
        },
        { additionalProperties: false }
      ),
    },
  },
  create: {
    description: "this will create role",
    tags: ["ADMIN|Role"],
    summary: "create role",
    operationId: "CreateRole",
    body: Type.Object(
      {
        name: Type.String(),
        description: Type.Optional(Type.String()),
        permissions: Type.Array(),
      },
      { required: ["name", "permissions"] },
      { additionalProperties: false }
    ),
  },
  update: {
    description: "this will update role",
    tags: ["ADMIN|Role"],
    summary: "update role",
    operationId: "UpdateRole",
    params: Type.Object(
      {
        roleId: Type.String({ format: "uuid" }),
      },
      { required: "roleId" },
      { additionalProperties: false }
    ),
    body: Type.Object(
      {
        name: Type.String(),
        description: Type.Optional(Type.String()),
        permissions: Type.Array(),
      },
      { additionalProperties: false }
    ),
  },
  delete: {
    description: "this will delete role",
    tags: ["ADMIN|Role"],
    summary: "delete role",
    operationId: "DeleteRole",
    params: Type.Object(
      {
        roleId: Type.String({ format: "uuid" }),
      },
      { required: "roleId" },
      { additionalProperties: false }
    ),
  },
  lov: {
    schema: {
      description: `this will list lov roles`,
      tags: ["ADMIN|Role"],
      summary: `Roles with lov`,
      operationId: "FetchRoleLov",
    },
  },
  permissionList: {
    schema: {
      description: `this will list permissions`,
      tags: ["ADMIN|Permission"],
      summary: `permissions with pagination`,
      operationId: "FetchPermissions",
      querystring: Type.Object(
        {
          page: Type.Integer({ default: 0, minimum: 0 }),
          size: Type.Integer({ default: 10, minimum: 10 }),
        },
        { additionalProperties: false }
      ),
    },
  },
};

export default swagger;
