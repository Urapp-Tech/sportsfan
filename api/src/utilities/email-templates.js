const emailWrapper = (content) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
    <!-- <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://yourdomain.com/logo.png" alt="Sport Fan Logo" style="max-width: 150px;">
    </div> -->
    <div style="padding: 20px;">
      ${content}
    </div>
    <div style="text-align: center; font-size: 12px; color: #888; margin-top: 20px;">
      <p>&copy; ${new Date().getFullYear()} Sport Fan. All rights reserved.</p>
    </div>
  </div>
`;

export const forgotPasswordTemplate = (otp) => emailWrapper(`
  <h2 style="color: #333;">Reset Your Password</h2>
  <p>Your OTP code is:</p>
  <h3 style="color: red;">${otp}</h3>
  <p>If you did not request this, please ignore this email.</p>
`);
