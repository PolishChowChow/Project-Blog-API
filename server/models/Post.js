const mongoose = require("mongoose");
const { timeStampType } = require("./typesForModels");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 100,
    },
    content: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 300,
    },
    is_published: {
        type: Boolean,
        required: true,
        default: false,
    },
    author: {
        required: true,
        ref: 'User',
        type: Schema.ObjectId
    },
    createdAt: timeStampType
})
const Post = mongoose.model('Post', postSchema)
module.exports = Post;