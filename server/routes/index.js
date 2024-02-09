require("dotenv").config();
const express = require("express");
const router = express.Router();
const {
  sign_up_middleware,
  login_middleware,
  logout_middleware,
} = require("../controllers/authController");
const { body } = require("express-validator");
router.post(
  "/signup",
  body("username").notEmpty().withMessage("username field is empty"),
  body("password").notEmpty().withMessage("password field is empty"),
  sign_up_middleware
);
router.post(
  "/login",
  body("username").notEmpty().withMessage("username field is empty"),
  body("password").notEmpty().withMessage("password field is empty"),
  login_middleware
);
router.get("/logout", logout_middleware);
module.exports = router;
