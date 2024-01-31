const mongoose = require("mongoose");
const { timeStampType, defaultStringType } = require("./typesForModels");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: defaultStringType,
    last_name: defaultStringType,
    username: defaultStringType,
    password: {
        minLength: 8,
        maxLength: 120,
        type: String,
        required: true,
    },
    createdAt: timeStampType
})
const User = mongoose.model('User', userSchema)
module.exports = User;