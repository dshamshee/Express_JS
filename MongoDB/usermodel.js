const mongooes = require('mongoose');

mongooes.connect(`mongodb://127.0.0.1:27017/mongopractice`);

const userSchema =  mongooes.Schema(
    {
        name: String,
        username: String,
        email: String
    }
);

// yaha jo bhi name denge uska prular form hoga ('user' = 'users')
module.exports =  mongooes.model("user", userSchema);