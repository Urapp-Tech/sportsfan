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
};

export default swagger;
