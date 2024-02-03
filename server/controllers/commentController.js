const asyncHandler = require("express-async-handler");
const Comment = require("../models/Comment");
exports.get_all_comments_under_post = asyncHandler(async (req, res, next) => {
  const comments = await Comment.find({
    post: req.params.postId,
  });
  res.status(200).json({
    comments,
  });
});
exports.get_specific_comment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentId);
  res.status(200).json({
    comment,
  });
});
exports.create_new_comment = asyncHandler(async (req, res, next) => {
  const commentData = req.body;
  const comment = new Comment(commentData);
  await comment.save();
  res.status(201);
});
exports.update_specific_comment = asyncHandler(async (req, res, next) => {
  const updatedData = req.body;
  const updatedComment = await Comment.findByIdAndUpdate(
    req.params.commentId,
    updatedData
  );
  if (updatedComment === null) {
    res.status(404);
  } else {
    res.status(204);
  }
});
exports.delete_specific_comment = asyncHandler(async (req, res, next) => {
  const deletedComment = await Comment.findByIdAndDelete(req.params.id);
  if (deletedComment === null) {
    res.status(404);
  } else {
    res.status(204);
  }
});
