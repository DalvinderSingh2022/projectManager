const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    comment: {
        type: String,
        require: true
    },
    projectId: {
        type: String,
        require: true
    },
    userName: {
        type: String,
        require: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Comment", commentSchema);