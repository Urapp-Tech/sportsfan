import { Type } from '@sinclair/typebox';

const swagger = {
  list: {
    description: 'this will list blogs',
    tags: ['APP|Blog'],
    summary: 'list blog',
    operationId: 'BlogList',
    querystring: Type.Object(
      {
        branch: Type.String({ format: 'uuid' }),
        page: Type.Integer({ default: 0, minimum: 0 }),
        size: Type.Integer({ default: 10, minimum: 10 }),
        search: Type.Optional(Type.String()),
      },
      { required: 'branch' },
      { additionalProperties: false }
    ),
  },
};

export default swagger;