import { Type } from '@sinclair/typebox';

const swagger = {
  login: {
    description: 'this will sign in back office user',
    tags: ['ADMIN|Back Office User'],
    summary: 'sign in back office user',
    operationId: 'backOfficeUserSignIn',
    body: Type.Object(
      {
        identifier: Type.String(),
        password: Type.String({ minLength: 8 }),
      },
      { additionalProperties: false }
    ),
  },
  logout: {
    description: 'this will sign out back office user',
    tags: ['ADMIN|Back Office User'],
    summary: 'sign out back office user',
    operationId: 'backOfficeUserSignOut',
    body: Type.Object(
      {
        invalidateAllTokens: Type.Boolean(),
      },
      { additionalProperties: false }
    ),
  },
  list: {
    description: 'this will list office users',
    tags: ['ADMIN|Back Office User'],
    summary: 'list back office user',
    operationId: 'backOfficeUseList',
    querystring: Type.Object(
      {
        page: Type.Integer({ default: 0, minimum: 0 }),
        size: Type.Integer({ default: 10, minimum: 10 }),
        search: Type.Optional(Type.String()),
      },
      { additionalProperties: false }
    ),
  },
  create: {
    description: 'this will create user',
    tags: ['ADMIN|User'],
    summary: 'create user',
    operationId: 'CreateUser',
    body: Type.Object(
      {
        firstName: Type.String(),
        lastName: Type.Optional(Type.String()),
        email: Type.String({ format: 'email' }),
        password: Type.String({
          pattern: '^[a-zA-Z0-9]{3,30}$',
        }),
        phone: Type.String(),
        address: Type.Optional(Type.String()),
        userType: Type.String(),
        role: Type.String(),
        avatar: Type.Optional(Type.Any({ isFile: true })),
      },
      { additionalProperties: false }
    ),
  },
  update: {
    description: 'this will update user',
    tags: ['ADMIN|User'],
    summary: 'update user',
    operationId: 'UpdateUser',
    params: Type.Object(
      {
        userId: Type.String({ format: 'uuid' }),
      },
      { additionalProperties: false }
    ),
    body: Type.Object(
      {
        firstName: Type.String(),
        lastName: Type.Optional(Type.String()),
        email: Type.String({ format: 'email' }),
        password: Type.String({
          pattern: '^[a-zA-Z0-9]{3,30}$',
        }),
        phone: Type.String(),
        address: Type.Optional(Type.String()),
        role: Type.String(),
        avatar: Type.Optional(Type.Any({ isFile: true })),
      },
      {
        additionalProperties: false,
      }
    ),
  },
  delete: {
    description: 'this will delete user',
    tags: ['ADMIN|User'],
    summary: 'delete user',
    operationId: 'DeleteUser',
    params: Type.Object(
      {
        userId: Type.String({ format: 'uuid' }),
      },
      { required: 'userId' },
      { additionalProperties: false }
    ),
  },
};

export default swagger;
