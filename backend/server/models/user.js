const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        default: ""
    },
    roleId: {
        type: String,
        default: "2"
    }
});

module.exports = new mongoose.model("User", userSchema);