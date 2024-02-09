const mongoose = require("mongoose");
const { timeStampType, likesType } = require("./typesForModels");
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
    createdAt: timeStampType,
    likes: likesType,
})
postSchema.virtual("url").get(function(){
    return `/posts/${this._id}`
})
postSchema.virtual("comments_url").get(function(){
    return `blog/posts/${this.id}/comments`
})
postSchema.set('toJSON', { virtuals: true });
const Post = mongoose.model('Post', postSchema)
module.exports = Post;