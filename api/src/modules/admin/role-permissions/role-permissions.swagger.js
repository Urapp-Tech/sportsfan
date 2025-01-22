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
};

export default swagger;
