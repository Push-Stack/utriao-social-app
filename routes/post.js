const express = require('express');

const authMiddleware = require('../middleware/auth');

const multerPostError = require('../utils/MulterPostError');
const Upload = require('../utils/multerUpload');
const { getAllPosts, getPost } = require('../controllers/post/GetPosts');
const addPost = require('../controllers/post/addPost');
const editPost = require('../controllers/post/editPost');
const deletePost = require('../controllers/post/deletePost');
const getImage = require('../controllers/post/getImage');
const { likePost, unlikePost } = require('../controllers/post/likePost');

const {
  addComment,
  deleteComment,
  editComment
} = require('../controllers/post/comment');

const router = express.Router();

router.post(
  '/api/users/posts',
  authMiddleware,

  Upload.single('postImage'),
  multerPostError,
  addPost
);

router.get('/api/users/posts/author/:id', authMiddleware, getAllPosts);

router.get('/api/users/posts/:id', authMiddleware, getPost);

router.put(
  '/api/users/posts/:id',
  authMiddleware,
  Upload.single('postImage'),
  multerPostError,
  editPost
);

router.delete('/api/users/posts/:id', authMiddleware, deletePost);

router.get('/api/users/posts/images/:id', getImage);

router.put('/api/users/posts/:id/like', authMiddleware, likePost);
router.put('/api/users/posts/:id/unlike', authMiddleware, unlikePost);

router.post('/api/users/posts/:id/comment', authMiddleware, addComment);

router.put(
  '/api/users/posts/:id/comment/:comment_id',
  authMiddleware,
  editComment
);

router.delete(
  '/api/users/posts/:id/comment/:comment_id',
  authMiddleware,
  deleteComment
);

module.exports = router;
