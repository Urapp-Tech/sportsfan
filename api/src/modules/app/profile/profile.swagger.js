import { Type } from '@sinclair/typebox';

const swagger = {
  profileUpdate: {
    description: 'This will update the user profile information.',
    tags: ['APP| Auth |User Profile Update'],
    summary: 'Update user profile information',
    operationId: 'appUserProfileUpdate',
    querystring: Type.Object(
      {
        branch: Type.String({ format: 'uuid' }),
      },
      {
        required: 'branch',
      },
      {
        additionalProperties: false,
      }
    ),
    body: Type.Object(
      {
        firstName: Type.String({ minLength: 1, maxLength: 50 }),
        lastName: Type.String({ minLength: 1, maxLength: 50 }),
        dob: Type.String({ format: 'date' }),
        phone: Type.String({ minLength: 10, maxLength: 15 }),
        team: Type.Optional(Type.String({ format: 'uuid' })),
        avatar: Type.Optional(Type.Any({ isFile: true })),
      },
      { additionalProperties: false }
    ),
    consumes: ['multipart/form-data'],
  },

  updatePassword: {
    description: 'This will update the user password.',
    tags: ['APP| Auth |User Password Update'],
    summary: 'Update user password',
    operationId: 'appUserPasswordUpdate',
    security: [{ BearerAuth: [] }], // Ensure the endpoint requires authentication
    body: Type.Object(
      {
        currentPassword: Type.String({ minLength: 8, maxLength: 50 }),
        newPassword: Type.String({ minLength: 8, maxLength: 50 }),
        confirmPassword: Type.String({ minLength: 8, maxLength: 50 }),
      },
      {
        additionalProperties: false,
      }
    ),
    response: {
      200: {
        description: 'Password updated successfully.',
        content: {
          'application/json': {
            schema: Type.Object({
              code: Type.Number({ default: 200 }),
              message: Type.String({
                default: 'Password updated successfully.',
              }),
              data: Type.Object({
                id: Type.String({ format: 'uuid' }),
                tenant: Type.String({ format: 'uuid' }),
                username: Type.String(),
                email: Type.String({ format: 'email' }),
                firstName: Type.String(),
                lastName: Type.String(),
                dob: Type.String({ format: 'date-time' }),
                phone: Type.String(),
                team: Type.String({ format: 'uuid' }),
                avatar: Type.String({ format: 'uri' }),
                interestedGambling: Type.Boolean(),
                isActive: Type.Boolean(),
                isDeleted: Type.Boolean(),
                createdAt: Type.String({ format: 'date-time' }),
                updatedAt: Type.String({ format: 'date-time' }),
              }),
            }),
          },
        },
      },
      400: {
        description: 'Bad Request',
        content: {
          'application/json': {
            schema: Type.Object({
              code: Type.Number({ default: 400 }),
              message: Type.String({
                default:
                  'Current password, new password, and confirm password are required.',
              }),
            }),
          },
        },
      },
      401: {
        description: 'Unauthorized',
        content: {
          'application/json': {
            schema: Type.Object({
              code: Type.Number({ default: 401 }),
              message: Type.String({
                default: 'Current password is incorrect.',
              }),
            }),
          },
        },
      },
      404: {
        description: 'User not found',
        content: {
          'application/json': {
            schema: Type.Object({
              code: Type.Number({ default: 404 }),
              message: Type.String({ default: 'User not found.' }),
            }),
          },
        },
      },
      500: {
        description: 'Internal Server Error',
        content: {
          'application/json': {
            schema: Type.Object({
              code: Type.Number({ default: 500 }),
              message: Type.String({
                default: 'An error occurred while updating the password.',
              }),
            }),
          },
        },
      },
    },
  },
};

export default swagger;
