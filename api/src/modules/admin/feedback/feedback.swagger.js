import { Type } from '@sinclair/typebox';
// console.log(Type.Array(Type.Any({ isFile: true })));
const swagger = {
  list: {
    description: 'this will list Feedbacks',
    tags: ['ADMIN|Feedback'],
    summary: 'list Feedback',
    operationId: 'FeedbackList',
    querystring: Type.Object(
      {
        page: Type.Integer({ default: 0, minimum: 0 }),
        size: Type.Integer({ default: 10, minimum: 10 }),
        search: Type.Optional(Type.String()),
      },
      { additionalProperties: false }
    ),
  },
  detail: {
    description: 'this will detail Feedbacks',
    tags: ['ADMIN|Feedback'],
    summary: 'detail Feedback',
    operationId: 'FeedbackDetail',
    params: Type.Object(
      {
        id: Type.String({ format: 'uuid' }),
      },
      { additionalProperties: false }
    ),
  },
  create: {
    description: 'this will create Feedback',
    tags: ['ADMIN|Feedback'],
    summary: 'Feedback page',
    operationId: 'CreateFeedback',
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
  // update: {
  //   description: 'this will update Feedback',
  //   tags: ['ADMIN|Feedback'],
  //   summary: 'update Feedback',
  //   operationId: 'UpdateFeedback',
  // params: Type.Object(
  //   {
  //     id: Type.String({ format: 'uuid' }),
  //   },
  //   { required: 'id' },
  //   { additionalProperties: false }
  // ),
  //   body: Type.Object(
  //     {
  //       title: Type.String(),
  //       price: Type.Number({ default: 0 }),
  //       discountedPrice: Type.Number({ default: 0 }),
  //       icon: Type.Optional(Type.Any({ isFile: true })),
  //       shortDescription: Type.Optional(Type.String()),
  //       detailDescription: Type.Optional(Type.String()),
  //       'images[]': Type.Union([
  //         Type.Array(Type.Any({ isFile: true })),
  //         Type.Any({ isFile: true }),
  //       ]),
  //     },
  //     { additionalProperties: false }
  //   ),
  // },
  delete: {
    description: 'this will delete Feedback',
    tags: ['ADMIN|Feedback'],
    summary: 'delete Feedback',
    operationId: 'DeleteFeedback',
    params: Type.Object(
      {
        id: Type.String({ format: 'uuid' }),
      },
      { additionalProperties: false }
    ),
  },
};

export default swagger;
