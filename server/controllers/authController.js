require("dotenv").config();
const User = require("../models/User");
const jtw = require("jsonwebtoken");
const bcrypt = require("bcrypt");
exports.sign_up_middleware = async (req, res, next) => {
  const { first_name, last_name, username, password } = req.body;
  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    if (err) {
      return next(err);
    } else {
      const user = new User({
        first_name,
        last_name,
        username,
        password: hashedPassword,
      });
      await user.save();
    }
  });

  const secret = process.env.SECRET_KEY;
  const token = jtw.sign({ username }, secret, {
    expiresIn: 120,
  });
  return res.status(200).json({
    message: "registered successfully",
    token,
  });
};

exports.login_middleware = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user === null || username !== user.username) {
    return res.status(401).json({ message: "auth failed" });
  } else {
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        message: "invalid data",
      });
    } else {
      const secret = process.env.SECRET_KEY;
      jtw.sign(
        { username },
        secret,
        {
          expiresIn: 120,
        },
        (err, token) => {
          return res.status(200).json({
            message: "auth completed succesfully",
            token,
          });
        }
      );
    }
  }
};

exports.logout_middleware = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    else{
        return res.status(200).json({
            message: "logout completed"
        });
    }
  });
};
