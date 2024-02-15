# MERN Stack Application

# Social App

## Prerequisites

Node JS and NPM installed

## Installation

##### Please read all carefully

- Clone the repository using either 'git clone' or by downloading the ZIP file.

- Navigate to the cloned repository.

- Execute the npm install command to install all Node.js dependencies.

- After installing all dependencies, navigate to the client folder.

- Execute the npm install command again to install React dependencies.

- After installing all dependencies, return to the root directory, and within the config directory, create a file named config.env.

- Inside the config.env file, you need to define environment variables that are essential for the app to run; otherwise, the app will crash.

- The environment variables you need to place in the config.env file are as follows:

        MONGO_URI=mongodb://127.0.0.1:27017/utriao for local Server

         JWT_SECRET= your secret key

         SENDGRID_API_KEY= Your SENDGRID API key

          USER= your email

         PASSWORD= your password

* The MONGO_URI variable will be used for connecting to the MongoDB Database. You can place your local MongoDB server connection string or remote server connection string here.

* The JWT_SECRET will be used as the secret key for JSON Web Tokens (JWT)

* Two services for email are included in this app.

             Choose one of them
           SENDGRID or NODEMailer

- For SendGrid, you need to include the SENDGRID_API_KEY variable in the config.env file.

- For Nodemailer, you need to include the USER and PASSWORD variables in the config.env file.

- To use the SENDGRID email service, you need to have a SendGrid account. Place your SendGrid API key in the SENDGRID_API_KEY variable. After placing the API key in the variable, navigate to the emails directory. Open the sendgrid.js file and uncomment all exports. Then, go to the account.js file and comment out all its exports. This is because the default account.js file is being used for the email service, which is nodemailer. By doing this, you will set up the SendGrid service for emails. Make sure to also change imports from account.js to sendgrid.js in some files.

- To use the nodemailer service, put your Google account email in the User variable like User=youremail. Then, add your Google account password in the Password Variable like Password='yourgmailpassword'. Visit the following link to enable nodemailer to access your Google account for email services: [Change Secure App setting](https://myaccount.google.com/lesssecureapps) **Turn it ON**

- After following all instructions, you have completely set up the app for running. All you need to do is run the command npm run dev in the root directory. This command will run both the Node.js and React servers.

---

### Happy Coding
