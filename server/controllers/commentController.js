const asyncHandler = require("express-async-handler");
const Comment = require("../models/Comment");
exports.get_all_comments_under_post = asyncHandler(async (req, res, next) => {
  const comments = await Comment.find({
    post: req.params.postId,
  }).populate("author", "username _id");
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
  if (!req.user) {
    return res.status(401).json("Access denied for no user logged in.");
  } else {
    const { postId } = req.params;
    const { content } = req.body;
    const comment = new Comment({
      content,
      post: postId,
      author: req.user,
      createdAt: new Date(),
      likes: [],
    });
    await comment.save();
    return res.status(201).json({
      message: "successfully added new comment",
    });
  }
});
exports.update_specific_comment = asyncHandler(async (req, res, next) => {
  const updatedData = req.body;
  const updatedComment = await Comment.findByIdAndUpdate(req.params.commentId, {
    $set: updatedData,
  });
  if (updatedComment === null) {
    return res.status(404).json({
      message:
        "Could not resolve operation for no valid comment with this particular id.",
    });
  }
  return res.status(204).json({
    message: "Updated correctly",
  });
});
exports.delete_specific_comment = asyncHandler(async (req, res, next) => {
  const deletedComment = await Comment.findByIdAndDelete(req.params.commentId);
  console.log(deletedComment);
  if (deletedComment === null) {
    return res.status(404).json({
      message:
        "Cannot perform delete for comment with this id cause it does not exists.",
    });
  } else {
    return res.status(200).json({
      message: "Successfully deleted comment",
    });
  }
});
