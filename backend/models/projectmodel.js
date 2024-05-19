const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    detail: String,
    duedate: Date,
    assignto: {
        type: String,
        require: true
    },
    assignby: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    commentCount: Number
});

module.exports = mongoose.model("Project", projectSchema);