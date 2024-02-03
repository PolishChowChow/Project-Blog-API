const mongoose = require("mongoose");
const { likesType, timeStampType } = require("./typesForModels");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 300,
    },
    author: {
        required: true,
        ref: 'User',
        type: Schema.ObjectId
    },
    post: {
        required: true,
        ref: 'Post',
        type: Schema.ObjectId
    },
    createdAt: timeStampType,
    likes: likesType,
})
const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment;