const express = require('express');
const AppError = require('../utils/AppError');
const router = express.Router();

router.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
module.exports = router;
