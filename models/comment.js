const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    //comments belongs to a user
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]
},{
    timestamps: true
});

const comment = mongoose.model('comment', commentSchema);
module.exports = comment;