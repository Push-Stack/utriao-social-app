const nodemailer = require('nodemailer');

const sender = process.env.USER;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: sender,
    pass: process.env.PASSWORD
  }
});

const accountCreated = (username, email) => {
  const mail = {
    from: sender,
    to: email,

    subject: 'Thanks for joining in!',
    text: `Welcome to the App, ${username}. Let me know how you get along with the app.`
  };

  transporter.sendMail(mail, (error, info) => {
    if (error) console.log(error);
  });
};

const accountDeleted = (username, email) => {
  const mail = {
    from: sender,
    to: email,

    subject: 'Sorry to see you go!',
    text: `GoodBye, ${username}. I hope to see you back sometime soon.`
  };

  transporter.sendMail(mail, (error, info) => {
    if (error) throw Error(error.message);
  });
};

const passwordChanged = (username, email, newPassword) => {
  const mail = {
    from: sender,
    to: email,

    subject: 'Password Change',
    text: `Dear ${username}, your account password is changed. Your new password is ${newPassword} . Please keep it save don't expose it to anyone.`
  };

  transporter.sendMail(mail, (error, info) => {
    if (error) throw Error(error.message);
  });
};

const emailChanged = (username, email, newEmail) => {
  const mail = {
    from: sender,
    to: email,

    subject: 'Email Change',
    text: `Dear ${username}, you have successfully changed your email. Your new email is ${newEmail}.`
  };

  transporter.sendMail(mail, (error, info) => {
    if (error) throw Error(error.message);
  });

  const newmail = {
    from: sender,
    to: newEmail,

    subject: 'Email Added',
    text: `${newEmail} is added successfully. You no longer can change your email again as u have changed it now.`
  };

  transporter.sendMail(newmail, (error, info) => {
    if (error) throw Error(error.message);
  });
};

const passwordResetToken = (email, resetURL) => {
  const mail = {
    from: sender,
    to: email,

    subject: 'Reset Account Password',
    text: `You can reset your account password using this link  ${resetURL}  .Please update your password to get access to your account...  `
  };
  transporter.sendMail(mail, (error, info) => {
    if (error) throw Error(error.message);
  });
};

const passwordReset = (email, username, newPassword) => {
  const mail = {
    from: sender,
    to: email,

    subject: 'Reset Password Successfull',
    text: `Dear ${username}, your account password is reset successfully. Your new password is ${newPassword} . Please keep it save don't expose it to anyone. Have a nice day ~`
  };
  transporter.sendMail(mail, (error, info) => {
    if (error) throw Error(error.message);
  });
};

module.exports = {
  accountCreated,
  accountDeleted,
  passwordChanged,
  emailChanged,
  passwordResetToken,
  passwordReset
};
