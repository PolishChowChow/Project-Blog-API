require("dotenv").config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const passport = require("passport")
const indexRouter = require('./routes/index');
const blogRouter = require("./routes/blog");
const cors = require("cors");
const app = express();
const jwtStrategy = require("./controllers/jtwStrategy")
mongoose.connect(process.env.CONNECTION_STRING)


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
passport.use(jwtStrategy)
app.use('/', indexRouter);

app.use('/blog', blogRouter);
// app.use(passport.authenticate('jwt', {session: false}))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // send status
  res.sendStatus(err.status || 500)
});

module.exports = app;
