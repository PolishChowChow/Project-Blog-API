const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const postSchema = new Schema({
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
    createdAt: timeStampType
})
const Post = mongoose.model('Post', postSchema)
module.exports = Post;