const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: `${__dirname}/config/config.env` });

const ConnectDb = require('./config/database');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const basicAPIRoute = require('./routes/basicAPI');
const wildCardRoute = require('./routes/wildCard');
const ErrorMiddleware = require('./middleware/Error');

process.on('uncaughtException', err => {
  console.log(`Uncaught Exceptions ==> ${err.name} ${err.message}   `);
  console.log('Server is shutting down');
  process.exit();
});

const app = express();
const PORT = process.env.PORT || 5000;
ConnectDb();

app.use(express.json());
app.use(basicAPIRoute);
app.use(userRoutes);
app.use(postRoutes);
app.use(wildCardRoute);
app.use(ErrorMiddleware);

const server = app.listen(PORT, () =>
  console.log(`Server is up on Port ${PORT}`)
);

process.on('unhandledRejection', err => {
  console.log(`Unhandled Rejections ==> ${err.name} ${err.message} `);
  console.log('Server is shutting down');
  server.close(() => {
    process.exit(1);
  });
});
