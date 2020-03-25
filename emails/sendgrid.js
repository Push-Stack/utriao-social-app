const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const company = 'no-reply@utriaoApp.com';

const accountCreated = (username, email) => {
  sgMail.send({
    to: email,
    from: company,
    subject: 'Thanks for joining in!',
    text: `Welcome to the App, ${username}. Let me know how you get along with the app.`
  });
};

const accountDeleted = (username, email) => {
  sgMail.send({
    to: email,
    from: company,
    subject: 'Sorry to see you go!',
    text: `GoodBye, ${username}. I hope to see you back sometime soon.`
  });
};

const passwordChanged = (username, email, newPassword) => {
  sgMail.send({
    to: email,
    from: company,
    subject: 'Password Change',
    text: `Dear ${username}, your account password is changed. Your new password is ${newPassword} . Please keep it save don't expose it to anyone.`
  });
};

const emailChanged = (username, email, newEmail) => {
  sgMail.send({
    to: email,
    from: company,
    subject: 'Email Change',
    text: `Dear ${username}, you have successfully changed your email. Your new email is ${newEmail}.`
  });

  sgMail.send({
    to: newEmail,
    from: company,
    subject: 'Email Added',
    text: `${newEmail} is added successfully. You no longer can change your email again as u have changed it now.`
  });
};

const passwordResetToken = (email, resetURL) => {
  sgMail.send({
    to: email,
    from: company,
    subject: 'Reset Account Password',
    text: `You can reset your account password using this link  ${resetURL}  .Please update your password to get access to your account...  `
  });
};

const passwordReset = (email, username, newPassword) => {
  sgMail.send({
    to: email,
    from: company,
    subject: 'Reset Password Successfull',
    text: `Dear ${username}, your account password is reset successfully. Your new password is ${newPassword} . Please keep it save don't expose it to anyone. Have a nice day ~`
  });
};

// module.exports = {
//   accountCreated,
//   accountDeleted,
//   passwordChanged,
//   emailChanged,
//   passwordResetToken,
//   passwordReset
// };
