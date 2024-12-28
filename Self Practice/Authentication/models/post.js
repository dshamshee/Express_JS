const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
    title: String,
    image: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, 
    date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('post', postSchema);