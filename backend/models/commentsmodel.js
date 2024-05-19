const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    comment: {
        type: String,
        require: true
    },
    project: {
        type: String,
        require: true
    },
    by: {
        type: String,
        require: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Comment", commentSchema);