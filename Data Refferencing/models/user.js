const mongoose = require('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017/testingthedatabase`);

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    age: Number,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        } // this is a reference to the Post model
    ]
})

module.exports = mongoose.model('user', userSchema);