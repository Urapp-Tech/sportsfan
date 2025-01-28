import { Type } from '@sinclair/typebox';
// console.log(Type.Array(Type.Any({ isFile: true })));
const swagger = {
  list: {
    description: 'this will list blogs',
    tags: ['ADMIN|Blog'],
    summary: 'list blog',
    operationId: 'BlogList',
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
    description: 'this will create blog',
    tags: ['ADMIN|Blog'],
    summary: 'blog page',
    operationId: 'CreateBlog',
    consumes: ['multipart/form-data'],
    body: Type.Object(
      {
        title: Type.String(),
        description: Type.String(),
        'images[]': Type.Union([
          Type.Array(Type.Any({ isFile: true })),
          Type.Any({ isFile: true }),
        ]),
      },
      { additionalProperties: false }
    ),
  },
  update: {
    description: 'this will update blog',
    tags: ['ADMIN|Blog'],
    summary: 'update blog',
    operationId: 'UpdateBlog',
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
      { additionalProperties: false }
    ),
  },
  delete: {
    description: 'this will delete blog',
    tags: ['ADMIN|Blog'],
    summary: 'delete blog',
    operationId: 'DeleteBlog',
    params: Type.Object(
      {
        id: Type.String({ format: 'uuid' }),
      },
      { additionalProperties: false }
    ),
  },
};

export default swagger;
