const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    imageUrl: {
        type: String,
        required: [true, 'Image URL is required']
    },
    date: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    },
    techStack: {
        type: String,
        required: [true, 'Tech stack is required']
    },
    githubLink: {
        type: String,
        required: [true, 'GitHub link is required']
    },
    author: {
        type: String,
        default: 'GJ Tech'
    },
    tags: [{
        type: String
    }],
    comments: [{
        user: String,
        text: String,
        date: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Blog', blogSchema); 