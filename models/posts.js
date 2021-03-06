const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const postScheme = new mongoose.Schema({
    title: {
        type: String,
        required: "Title is Required",
        minlength: 4,
        maxlength: 158
    },
    body: {
        type: String,
        required: "Body is Required",
        minlength: 4,
        maxlength: 2080
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    postedBy : {
        type: ObjectId,
        ref: "User"
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    likes: [{type: ObjectId, ref: "User"}],
    comments: [
        {
            text: String,
            created: {type: Date, default:  Date.now },
            postedBy: { type: ObjectId, ref: "User" }
        }
    ],

});

module.exports = mongoose.model("Post", postScheme);