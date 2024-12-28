const express = require('express');
const app = express();
const userModel = require('./models/user');
const postModel = require('./models/post');

app.get('/', function(req, res){
    res.send("Done")
})

// Create a new user
app.get('/create', async function(req, res){
   let user = await userModel.create({
        username: "Danish",
        age: 25,
        email: "danish@gmail.com"
    })
    res.send(user); 
})

// Create a new Post
app.get('/post/create', async function(req, res){
  let post = await postModel.create({
    postdata: "Hello this a firest Post",
    user: "676e517250480c01829d074f"
   })

  let user = await userModel.findOne({_id: "676e517250480c01829d074f"})
  user.posts.push(post._id); // Add the post's ID to the user's posts array
  await user.save(); // Save the updated user document (kyu ki ye hamne yaha directly update kiya hai bina "findOneAndUpdate()" ka use kare isliye save krna jaruri hai)

   res.send({post, user});
})

app.listen(3000);