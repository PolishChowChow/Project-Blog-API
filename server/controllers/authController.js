require("dotenv").config();
const User = require("../models/User");
const jtw = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
exports.sign_up_middleware = async (req, res, next) => {
  // const result = validationResult(req)
  // if(result.errors.length > 0){
  //   return res.status(422).json({
  //     message: result.errors[0]
  //   })
  // }
  const { first_name, last_name, username, password } = req.body;
  console.log(req.body)
  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    if (err) {
      console.log(err)
      return next(err);
    } else {
      const user = new User({
        first_name,
        last_name,
        username,
        password: hashedPassword,
        createdAt: new Date()
      });
      console.log(user)
      await user.save();
      const secret = process.env.SECRET_KEY;
      const token = jtw.sign({ username }, secret, {
        expiresIn: "1 day",
      });
      return res.status(200).json({
        message: "registered successfully",
        userId: user._id,
        token,
      });
    }
  });
};

exports.login_middleware = async (req, res, next) => {
  const result = validationResult(req)
  if(result.errors.length > 0){
    return res.status(422).json({
      message: result.errors[0]
    })
  }
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user === null || username !== user.username) {
    return res.status(422).json({ message: "auth failed" });
  } else {
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(422).json({
        message: "invalid data",
      });
    } else {
      const secret = process.env.SECRET_KEY;
      const token = jtw.sign({ username }, secret, {
        expiresIn: 60 * 60 * 24,
      });
      console.log(token)
      return res.status(200).json({
        message: "auth completed succesfully",
        userId: user._id,
        token,
      });
    }
  }
};

exports.logout_middleware = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    } else {
      return res.status(200).json({
        message: "logout completed",
      });
    }
  });
};

exports.verify_userId_with_token = (req, res, next) => {
  const userId = req.headers.userid;
  if(req.user.id === userId){
    return next()
  }
  else{
    return res.status(401).json({
      message: "Access denied, token and id don't refer to the same user."
    })
  }
}