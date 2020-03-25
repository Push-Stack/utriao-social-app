const express = require('express');

const multerError = require('../utils/MulterError');
const Upload = require('../utils/multerUpload');
const { check } = require('express-validator');
const authMiddleware = require('../middleware/auth');
const registerUser = require('../controllers/user/registerUser');
const loginUser = require('../controllers/user/loginUser');
const getProfile = require('../controllers/user/getProfile');
const getUser = require('../controllers/user/getUser');
const logoutUser = require('../controllers/user/logoutUser');
const logoutAll = require('../controllers/user/logoutAll');
const updateUserPersonal = require('../controllers/user/updateUserPersonal');
const updateUserHobbies = require('../controllers/user/updateUserHobbies');

const userEducation = require('../controllers/user/UserEducation');
const changeEmail = require('../controllers/user/changeEmail');
const changePassword = require('../controllers/user/changePassword');
const deleteUser = require('../controllers/user/deleteUser');
const {
  forgotPassword,
  resetPassword
} = require('../controllers/user/resetPassword');

const {
  changeAvatar,
  getAvatar,
  deleteAvatar
} = require('../controllers/user/Avatar');

const {
  changeCover,
  getCover,
  deleteCover
} = require('../controllers/user/Cover');

const { follow, unfollow } = require('../controllers/user/followAndUnfollow');

const searchUsers = require('../controllers/user/SearchUsers');

const router = express.Router();

//Register Users
router.post(
  '/api/users/register',
  [
    check('username', 'Please add username')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email ').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({
      min: 6
    }),
    check('confirmPassword', 'Please confirm your password').isLength({
      min: 6
    })
  ],
  registerUser
);

//Login User
router.post(
  '/api/users/login',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required')
      .not()
      .isEmpty()
  ],
  loginUser
);

//getownProfile

router.get('/api/users/me', authMiddleware, getProfile);

//Get Any User

router.get('/api/users/profile/:id', authMiddleware, getUser);

//logout User
router.post('/api/users/logout', authMiddleware, logoutUser);

//logout All User
router.post('/api/users/logoutAll', authMiddleware, logoutAll);

//Update User Personal
router.put(
  '/api/users/personal',
  authMiddleware,
  [
    check('username', 'Username is required')
      .isString()
      .isLength('5'),
    check('gender', 'Gender is required').isString(),
    check('country', 'Country is required').isString(),
    check('state', 'State is required').isString(),
    check('city', 'City is required').isString(),
    check('birthday', 'Birthday is required').isString(),
    check('birthplace', 'Birthplace is required').isString(),
    check('status', 'Status is required').isString(),
    check('occupation', 'Occupation is required').isString(),
    check('phone', 'Phone is required').isString(),
    check('description', 'Description is required').isString(),

    check('religion', 'Religion is required').isString(),
    check('website', 'Website is required').isString(),
    check('politicalIncline', 'PoliticalIncline is required').isString(),
    check('facebook', 'FacebookLink is required').isString(),
    check('twitter', 'TwitterLink is required').isString(),
    check('instagram', 'InstaLink is required').isString()
  ],
  updateUserPersonal
);
//Update User Hobbies
router.put(
  '/api/users/hobbies',
  authMiddleware,
  [
    check('hobbies', 'Hobbies is required').isString(),
    check('favouriteMusic', 'FavouriteMusic is required').isString(),

    check('favouriteTvShows', 'FavouriteTvShows is required').isString(),
    check('favouriteBooks', 'FavouriteBooks is required').isString(),
    check('favouriteMovies', 'FavouriteMovies is required').isString(),
    check('favouriteWriters', 'FavouriteWriters is required').isString(),
    check('favouriteGames', 'FavouriteGames is required').isString(),
    check('otherInterests', 'OtherInterests is required').isString()
  ],
  updateUserHobbies
);

//add User Education
router.post(
  '/api/users/education',
  authMiddleware,
  [
    check('title', 'Title is required')
      .isString()
      .isLength({ min: 3 }),
    check('description', 'Description is required').isString(),
    check('startingYear', 'Starting Year is required')
      .isString()
      .isLength({ min: 8 }),
    check('endingYear', 'Ending Year is required')
      .isString()
      .isLength({ min: 8 })
  ],
  userEducation.addUserEducation
);

//update User education
router.put(
  '/api/users/education/:id',
  authMiddleware,
  [
    check('title', 'Title is required').isString(),
    check('description', 'Description is required').isString(),
    check('startingYear', 'Starting Year is required').isString(),
    check('endingYear', 'Ending Year is required').isString()
  ],
  userEducation.updateUserEducation
);

// //delete user education
router.delete(
  '/api/users/education/:id',
  authMiddleware,
  userEducation.deleteUserEducation
);

//change email
router.put(
  '/api/users/email',
  authMiddleware,
  [check('email', 'Please include a valid email ').isEmail()],
  changeEmail
);

//change password

router.put(
  '/api/users/password',
  authMiddleware,
  [
    check('password', 'Password is required').isLength({ min: 2 }),
    check(
      'newPassword',
      'Please enter a new password with 6 or more characters'
    ).isLength({
      min: 6
    }),
    check('confirmNewPassword', 'Please confirm your password').isLength({
      min: 2
    })
  ],
  changePassword
);

//Delete User

router.delete(
  '/api/users/delete',
  authMiddleware,
  [
    check('email', 'Please provide your email').isEmail(),
    check('password', 'Password is required').isLength({ min: 2 }),
    check('reason', 'Please provide valid reason').isLength({ min: 9 })
  ],
  deleteUser
);

//Change Profile Pic  | Avatar
router.post(
  '/api/users/avatar',
  authMiddleware,
  Upload.single('avatar'),
  changeAvatar,
  multerError
);

//Get Avatar

router.get('/api/users/avatar/:id', getAvatar);

//Delete Avatar
router.delete('/api/users/avatar', authMiddleware, deleteAvatar);

//Change Profile Cover

router.post(
  '/api/users/cover',
  authMiddleware,
  Upload.single('cover'),
  changeCover,
  multerError
);

//Get Profile Cover
router.get('/api/users/cover/:id', getCover);

//Delete Cover
router.delete('/api/users/cover', authMiddleware, deleteCover);

router.post(
  '/api/users/forgotPassword',
  [check('email').isEmail()],
  forgotPassword
);

router.put(
  '/api/users/resetPassword/:token',
  [
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({
      min: 6
    }),
    check('confirmPassword', 'Please confirm password').exists()
  ],
  resetPassword
);

router.put('/api/users/:id/follow', authMiddleware, follow);
router.put('/api/users/:id/unfollow', authMiddleware, unfollow);

router.post('/api/users/search', authMiddleware, searchUsers);

module.exports = router;
