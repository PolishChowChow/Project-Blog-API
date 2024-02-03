const express = require('express');
const { get_all_posts, create_new_post, get_specific_post, delete_specific_post, update_specific_post } = require('../controllers/postController');
const { get_all_comments_under_post, create_new_comment, delete_specific_comment, update_specific_comment, get_specific_comment } = require('../controllers/commentController');
const router = express.Router();


router.route('/posts')
  .get(get_all_posts)
  .post(create_new_post)

router.route('/posts/:postId')
  .get(get_specific_post)
  .delete(delete_specific_post)
  .put(update_specific_post)

router.route('/posts/:postId/comments')
  .get(get_all_comments_under_post)
  .post(create_new_comment)
  
router.route('/posts/:postId/comments/:commentId')
  .get(get_specific_comment)
  .delete(delete_specific_comment)
  .put(update_specific_comment)

module.exports = router;
