require("dotenv").config();
const express = require("express");
const router = express.Router();
const { sign_up_middleware, login_middleware, logout_middleware } = require("../controllers/authController");

router.get("/", function (req, res, next) {
  res.json({
    message: "hi world",
  });
});
router.post("/signup", sign_up_middleware);
router.post("/login", login_middleware);
router.get("/logout", logout_middleware);
module.exports = router;
