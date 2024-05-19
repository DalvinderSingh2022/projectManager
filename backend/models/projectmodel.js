const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    detail: {
        type: String,
        require: true
    },
    duedate: {
        type: Date,
        require: true
    },
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
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Project", projectSchema);