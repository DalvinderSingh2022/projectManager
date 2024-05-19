const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    displayName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    photoURL: {
        type: String,
        require: true
    },
    isCurrentUser: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);