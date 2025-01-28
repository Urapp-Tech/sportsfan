import { Type } from '@sinclair/typebox';

const swagger = {
  list: {
    description: 'this will list pages',
    tags: ['ADMIN|Page'],
    summary: 'list page',
    operationId: 'PageList',
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
    description: 'this will create page',
    tags: ['ADMIN|Page'],
    summary: 'create page',
    operationId: 'CreatePage',
    body: Type.Object(
      {
        title: Type.String(),
        body: Type.Optional(Type.String()),
      },
      { required: ['title', 'body'] },
      { additionalProperties: false }
    ),
  },
  update: {
    description: 'this will update page',
    tags: ['ADMIN|Page'],
    summary: 'update page',
    operationId: 'UpdatePage',
    params: Type.Object(
      {
        id: Type.String({ format: 'uuid' }),
      },
      { required: 'id' },
      { additionalProperties: false }
    ),
    body: Type.Object(
      {
        title: Type.String(),
        body: Type.Optional(Type.String()),
      },
      { required: ['title', 'body'] },
      { additionalProperties: false }
    ),
  },
  delete: {
    description: 'this will delete page',
    tags: ['ADMIN|Page'],
    summary: 'delete page',
    operationId: 'DeletePage',
    params: Type.Object(
      {
        id: Type.String({ format: 'uuid' }),
      },
      { required: 'id' },
      { additionalProperties: false }
    ),
  },
};

export default swagger;
