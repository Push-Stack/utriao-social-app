const User = require('../../models/User/User');
const { validationResult } = require('express-validator');
const CatchAsync = require('../../utils/CatchAsync');
const AppError = require('../../utils/AppError');

const addUserEducation = CatchAsync(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.errors.map(error => error.msg);

    return res.status(400).send({ status: 'Fail', message });
  }

  req.user.education = req.user.education.concat({
    title: req.body.title,
    startingYear: req.body.startingYear,
    endingYear: req.body.endingYear,
    description: req.body.description
  });
  await req.user.save();

  res.send({
    status: 'Success',
    message: 'Education field is added'
  });
});

const updateUserEducation = CatchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.errors.map(error => error.msg);

    return res.status(400).send({ status: 'Fail', message });
  }

  const user = await User.findOne({ 'education._id': req.params.id });

  if (!user) return next(new AppError('Not Found', 404));

  user.education.map(item => {
    if (item.id === req.params.id) {
      item.title = req.body.title;
      item.startingYear = req.body.startingYear;
      item.endingYear = req.body.endingYear;
      item.description = req.body.description;
    }
  });

  await user.save();

  res.send({
    status: 'Success',
    message: 'Education field is updated'
  });
});

const deleteUserEducation = CatchAsync(async (req, res, next) => {
  const user = await User.findOne({ 'education._id': req.params.id });

  if (!user) return next(new AppError('Not Found', 404));

  user.education = user.education.filter(item => {
    return item.id !== req.params.id;
  });

  await user.save();

  res.send({
    status: 'Success',
    message: 'Education field is deleted'
  });
});

module.exports = {
  addUserEducation,
  updateUserEducation,
  deleteUserEducation
};
