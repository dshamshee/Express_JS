const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    data: {type: Date, default: Date.now},
    content: String,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})


module.exports = mongoose.model('Post', postSchema);