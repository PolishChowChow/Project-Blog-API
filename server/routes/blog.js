const express = require('express');
const { create_new_post, get_specific_post, delete_specific_post, update_specific_post, get_all_published_posts, get_all_posts } = require('../controllers/postController');
const { get_all_comments_under_post, create_new_comment, delete_specific_comment, update_specific_comment, get_specific_comment } = require('../controllers/commentController');
const router = express.Router();
const passport = require("passport");
const { verify_userId_with_token } = require('../controllers/authController');

router.get('/posts', get_all_published_posts)
router.get('/posts_all', get_all_posts)
router.get('/posts/:postId',get_specific_post)
router.get('/posts/:postId/comments',get_all_comments_under_post)
router.get('/posts/:postId/comments/:commentId',get_specific_comment)

router.use(passport.authenticate('jwt', {session: false}))
router.use(verify_userId_with_token)

router.post('/posts', create_new_post)
router.route('/posts/:postId')
  .delete(delete_specific_post)
  .put(update_specific_post)

router.post('/posts/:postId/comments', create_new_comment)
  
router.route('/posts/:postId/comments/:commentId')
  .delete(delete_specific_comment)
  .put(update_specific_comment)

module.exports = router;
