const asyncHandler = require("express-async-handler");
const Post = require("../models/Post");
exports.get_all_posts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find({});
  res.status(200).json({
    posts,
  });
});
exports.get_specific_post = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.postId);
  if (!post) {
    res.status(404).json({
      message: "post with this id not found1",
    });
  } else {
    res.status(200).json({
      post,
    });
  }
});
exports.create_new_post = asyncHandler(async (req, res, next) => {
  const postData = req.body;
  const post = new Post(postData);
  await post.save();
  res.status(201);
});
exports.update_specific_post = asyncHandler(async (req, res, next) => {
  const updatedData = req.body;
  const updatedPost = await Post.findByIdAndUpdate(
    req.params.postId,
    updatedData
  );
  if (updatedPost === null) {
    res.status(404);
  } else {
    res.status(204);
  }
});
exports.delete_specific_post = asyncHandler(async (req, res, next) => {
  const deletedPost = await Post.findByIdAndDelete(req.params.postId);
  if (deletedPost === null) {
    res.status(404);
  } else {
    res.status(204);
  }
});
