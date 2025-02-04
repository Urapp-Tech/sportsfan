import { Type } from '@sinclair/typebox';

const swagger = {
  login: {
    description: 'this will sign in app user',
    tags: ['APP| Auth |User Sign in'],
    summary: 'sign in app user',
    operationId: 'appUserSignIn',
    querystring: Type.Object(
      {
        tenant: Type.String({ format: 'uuid' }),
      },
      {
        required: 'tenant',
      },
      {
        additionalProperties: false,
      }
    ),
    body: Type.Object(
      {
        email: Type.String({ format: 'email' }),
        password: Type.String({ minLength: 8 }),
      },
      { additionalProperties: false }
    ),
  },
  register: {
    description: 'this will register app user',
    tags: ['APP| Auth |User register'],
    summary: 'sign in app user',
    operationId: 'appUserRegister',
    querystring: Type.Object(
      {
        tenant: Type.String({ format: 'uuid' }),
      },
      {
        required: 'tenant',
      },
      {
        additionalProperties: false,
      }
    ),
    body: Type.Object(
      {
        username: Type.String({
          title: 'User name',
          maxLength: 50,
          minLength: 3,
        }),
        email: Type.String({ format: 'email' }),
        password: Type.String({ minLength: 8 }),
        password_confirmed: Type.String({ minLength: 8 }),
        interestedGambling: Type.Boolean({ default: false }),
      },
      { additionalProperties: false }
    ),
  },
  forgotPassword: {
    description: 'this will send email to reset password ',
    tags: ['APP| Auth |Forgot Password'],
    summary: 'reset password email',
    operationId: 'appUserResetPassword',
    querystring: Type.Object(
      {
        tenant: Type.String({ format: 'uuid' }),
      },
      {
        required: 'tenant',
      },
      {
        additionalProperties: false,
      }
    ),
    body: Type.Object(
      {
        email: Type.String({ format: 'email' }),
      },
      { additionalProperties: false }
    ),
  },
  verifyOtp: {
    description: 'this will verify OTP for password reset',
    tags: ['APP| Auth |Verify OTP'],
    summary: 'verify OTP to proceed with reset password',
    operationId: 'appUserVerifyOtp',
    querystring: Type.Object(
      {
        tenant: Type.String({ format: 'uuid' }),
      },
      {
        required: 'tenant',
      },
      {
        additionalProperties: false,
      }
    ),
    body: Type.Object(
      {
        email: Type.String({ format: 'email' }),
        otp: Type.String({ minLength: 4, maxLength: 4 }),
      },
      { additionalProperties: false }
    ),
  },
  resetPassword: {
    description: 'this will reset the user password after OTP verification',
    tags: ['APP| Auth |Reset Password'],
    summary: 'reset user password after OTP verification',
    operationId: 'appUserResetPasswordAction',
    querystring: Type.Object(
      {
        tenant: Type.String({ format: 'uuid' }),
      },
      {
        required: 'tenant',
      },
      {
        additionalProperties: false,
      }
    ),
    body: Type.Object(
      {
        email: Type.String({ format: 'email' }),
        otp: Type.String({ minLength: 4, maxLength: 4 }),
        newPassword: Type.String({ minLength: 8 }),
        confirmPassword: Type.String({ minLength: 8 }),
      },
      { additionalProperties: false }
    ),
  },
  logout: {
    description: 'this will sign out user',
    tags: ['APP| Auth |Sign out'],
    summary: 'sign out user',
    operationId: 'appUserSignOutAction',
    body: Type.Object(
      {
        invalidateAllTokens: Type.Boolean(),
      },
      { additionalProperties: false }
    ),
  },
};

export default swagger;
