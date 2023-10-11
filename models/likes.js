const mongoose = require('mongoose');

const likeschema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
    },
    //this defines object id of liked object
    likeable: {
        type: mongoose.Schema.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    //this field is used for defining the type of liked object since this is a dynamic reference
    onModel: {
        type: String,
        required: true,
        enum: ['Post', 'comment']
    }
}, {
    timestamps: true
});

const Like = mongoose.model('Like', likeschema);
module.exports = Like;
