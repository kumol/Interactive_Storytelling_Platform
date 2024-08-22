const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        default: ""
    },
    
    createdAt: {
        type: String,
        default: ""
    }
})