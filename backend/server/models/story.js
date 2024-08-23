const mongoose = require("mongoose");

const PathSchema = new mongoose.Schema({
    option: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
});

const storySchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        default: ""
    },
    paths: {
        type: [PathSchema],
        validate: {
            validator: function(v) {
                const options = v.map(path => path.option);
                return new Set(options).size === options.length;
            },
            message: props => `Duplicate options found in paths!`
        }
    },
    engagedTime: {
        type: Number,
        default: 0
    },
    authorId: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
        default: ""
    },
    createdAt: {
        type: String,
        default: ""
    }
});

module.exports = new mongoose.model("Story", storySchema);