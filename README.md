# MERN Stack Application

# Social App

## Prerequisites

Node JS and NPM installed

## Installation

##### Please read all carefully

- **Clone repository** using git clone or download Zip file

- Cd into **cloned repository**

- Run **npm install** command to install all **node js dependencies**

- After installing all dependencies cd into **client folder**

- Run **npm install** command again to install **React dependencies**

- After installing all dependencies go back to **root directory** and inside config directory **create config.env file.**

- Inside config.env file u need to **create environment variables** which is essential for App to run otherwise app will crash..

- **Environment variables** u need to place in config.env file is

        MONGO_URI=mongodb://127.0.0.1:27017/utriao for local Server

         JWT_SECRET= your secret key

         SENDGRID_API_KEY= Your SENDGRID API key

          USER= your email

         PASSWORD= your password

* **Mongo_URI variable** will be used for connecting to Mongodb Database. You can place here your local mongodb server connection string or remote server.

* **JWT_SECRET** will be used for jsonwebtoken Secret Key.

* Two services for **email** are included in this App

             Choose one of them
           SENDGRID & NODEMailer

- For **sendgrid** u need **SENDGRID_API_KEY** variable in config.env

- For **nodemail** u need **User and Password** variable in config.env

- To **use SENDGRID email** service u need to have sendgrid account. You need to place SENDGRID API key of your account in SENDGRID_API_KEY variable.After placing API key in variable go to emails directory... open sendgrid.js file and uncomment all exports and then go to account.js file and comment all its exports. Because for default account.js file is being used for email service which is nodemailer. By doing this u will setup sendgrid service for emails.Make sure to also change imports of account.js to sendgrid.js in some files.

- To **use nodemailer service**.... Place your google account email in User variable like User=youremail...Place your google account password in Password Variable like Password='yourgmailpassword'...Go to this link to allow nodemailer to access your google account for email services [Change Secure App setting](https://myaccount.google.com/lesssecureapps) **Turn it ON**

- After following all instructions you have completely setup App for running. All u need to do is to to run command **npm run dev** in **root directory**. This command will run **both servers nodejs and react**.

---

### Happy Coding
