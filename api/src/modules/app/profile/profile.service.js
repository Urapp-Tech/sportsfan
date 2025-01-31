import model from '#models/user.model';
import promiseHandler from '#utilities/promise-handler';
import HTTP_STATUS from '#utilities/http-status';
import { uploadFile } from '#utilities/helper';

/**
 * Update user profile.
 * @param {Object} req
 * @returns {Object}
 */
const updateProfile = async (req) => {
  const { firstName, lastName, dob, phone, team, avatar } = req.body;
  const { tenant, id:userId } = req.user;

  if (!firstName || !lastName || !dob || !phone) {
    const err = new Error(
      'First name, last name, dob, and phone are required.'
    );
    err.code = HTTP_STATUS.BAD_REQUEST;
    throw err;
  }

  let avatarUrl = null;
  if (avatar) {
    avatarUrl = await uploadFile(req, avatar);
  }

  // Update user in the database
  const updateData = {
    firstName,
    lastName,
    dob,
    phone,
    team: team || null, // team is optional
    avatar: avatarUrl || null, // Avatar is optional, could be from URL or file upload
  };
 
  const [error, updatedUser] = await promiseHandler(
    model.updateUser(req.knex, userId, updateData)
  );

  if (error) {
    const err = new Error(error.detail ?? error.message);
    err.code = error.code ?? HTTP_STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }

  delete updatedUser.password;

  return {
    code: HTTP_STATUS.OK,
    message: 'Profile updated successfully.',
    data: updatedUser,
  };
};

/**
 * update user password.
 * @param {Object} req
 * @returns {Object} 
 */
const updatePassword = async (req) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const { id: userId } = req.user;
  
    if (!currentPassword || !newPassword || !confirmPassword) {
      const err = new Error('Current password, new password, and confirm password are required.');
      err.code = HTTP_STATUS.BAD_REQUEST;
      throw err;
    }
  
    if (newPassword !== confirmPassword) {
      const err = new Error('New password and confirm password do not match.');
      err.code = HTTP_STATUS.BAD_REQUEST;
      throw err;
    }
  
    // Fetch the user's current password hash from the database
    const [error, user] = await promiseHandler(
      model.getUserBy(req.knex, (db) => {
        db.where('id', userId);
      })
    );
  
    if (error) {
      const err = new Error(error.detail ?? error.message);
      err.code = error.code ?? HTTP_STATUS.INTERNAL_SERVER_ERROR;
      throw err;
    }
  
    if (!user) {
      const err = new Error('User not found.');
      err.code = HTTP_STATUS.NOT_FOUND;
      throw err;
    }
  
    // Compare the provided current password with the stored hash
    const isPasswordValid = await req.bcrypt.compare(currentPassword, user.password);
  
    if (!isPasswordValid) {
      const err = new Error('Current password is incorrect.');
      err.code = HTTP_STATUS.UNAUTHORIZED;
      throw err;
    }
  
    // Hash the new password
    const hashedPassword = await req.bcrypt.hash(newPassword);
  
    // Update the user's password in the database
    const [updateError, updatedUser] = await promiseHandler(
      model.updateUser(req.knex, userId, { password: hashedPassword })
    );
  
    if (updateError) {
      const err = new Error(updateError.detail ?? updateError.message);
      err.code = updateError.code ?? HTTP_STATUS.INTERNAL_SERVER_ERROR;
      throw err;
    }
  
    return {
      code: HTTP_STATUS.OK,
      message: 'Password updated successfully.',
      data: updatedUser,
    };
  };
  

export default {
  updateProfile,
  updatePassword
};
