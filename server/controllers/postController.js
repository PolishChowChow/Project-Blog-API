const asyncHandler = require("express-async-handler");
const Post = require("../models/Post");
exports.get_all_posts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find({}, {}, { createdAt: -1 }).populate(
    "author",
    "username"
  );
  return res.status(200).json({
    posts: posts,
  });
});
exports.get_all_published_posts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find(
    { is_published: true },
    {},
    { createdAt: -1 }
  ).populate("author", "username");
  return res.status(200).json({
    posts: posts,
  });
});
exports.get_specific_post = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.postId).populate(
    "author",
    "username"
  );
  if (!post) {
    res.status(404).json({
      message: "post with this id not found",
    });
  } else {
    res.status(200).json({
      post,
    });
  }
});
exports.create_new_post =async (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      message: "User is not authorize, access denied",
    });
  }
  else{
    const { title, content } = req.body;
    const post = new Post({
      title,
      content,
      author: req.user,
      createdAt: new Date(),
      likes: [],
      is_published: true,
    });
    console.log(post);
    await post.save();
    return res.set("Content-Type", "application/json").status(201).json({
      message: "post created successfully",
    });
  }
};
exports.update_specific_post = asyncHandler(async (req, res, next) => {
  const updatedData = req.body;
  const updatedPost = await Post.findByIdAndUpdate(
    req.params.postId,
    updatedData
  );
  if (updatedPost === null) {
    res.status(404).json({
      message: "Cannot update post with not-existing id."
    });
  } else {
    res.status(204).json({
      message: "post updated successfully"
    });
  }
});
exports.delete_specific_post = asyncHandler(async (req, res, next) => {
  const deletedPost = await Post.findByIdAndDelete(req.params.postId);
  if (deletedPost === null) {
    return res.status(404).json({
      message: "Cannot resolve delete operation for no post with this particular id."
    });
  } else {
    return res.status(200).json({
      message: "Comment deleted successfully."
    });
  }
});
