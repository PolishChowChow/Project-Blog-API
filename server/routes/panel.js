require("dotenv").config();
const express = require("express");
const router = express.Router();

router.route("/")
    .get()
    .post()

router.route("/:postId")
    .get()
    .put()
    .delete()

router.route("/:postId/comments")
    .get()
    .post()

router.route("/:postId/comments/:commentId")
    .get()
    .put()
    .delete()
    