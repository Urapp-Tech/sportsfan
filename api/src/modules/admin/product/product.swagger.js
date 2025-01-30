import { Type } from '@sinclair/typebox';
// console.log(Type.Array(Type.Any({ isFile: true })));
const swagger = {
  list: {
    description: 'this will list Products',
    tags: ['ADMIN|Product'],
    summary: 'list Product',
    operationId: 'ProductList',
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
    description: 'this will create Product',
    tags: ['ADMIN|Product'],
    summary: 'Product page',
    operationId: 'CreateProduct',
    consumes: ['multipart/form-data'],
    body: Type.Object(
      {
        title: Type.String(),
        price: Type.Number({ default: 0 }),
        discountedPrice: Type.Number({ default: 0 }),
        icon: Type.Optional(Type.Any({ isFile: true })),
        shortDescription: Type.Optional(Type.String()),
        detailDescription: Type.Optional(Type.String()),
        'images[]': Type.Union([
          Type.Array(Type.Any({ isFile: true })),
          Type.Any({ isFile: true }),
        ]),
      },
      { additionalProperties: false }
    ),
  },
  update: {
    description: 'this will update Product',
    tags: ['ADMIN|Product'],
    summary: 'update Product',
    operationId: 'UpdateProduct',
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
        price: Type.Number({ default: 0 }),
        discountedPrice: Type.Number({ default: 0 }),
        icon: Type.Optional(Type.Any({ isFile: true })),
        shortDescription: Type.Optional(Type.String()),
        detailDescription: Type.Optional(Type.String()),
        'images[]': Type.Union([
          Type.Array(Type.Any({ isFile: true })),
          Type.Any({ isFile: true }),
        ]),
      },
      { additionalProperties: false }
    ),
  },
  delete: {
    description: 'this will delete Product',
    tags: ['ADMIN|Product'],
    summary: 'delete Product',
    operationId: 'DeleteProduct',
    params: Type.Object(
      {
        id: Type.String({ format: 'uuid' }),
      },
      { additionalProperties: false }
    ),
  },
};

export default swagger;
