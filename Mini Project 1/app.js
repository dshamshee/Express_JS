const express = require('express');
const app = express();
const userModel = require('./models/user');
const postModel = require('./models/post');
const cookieParser = require('cookie-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// User registration Form
app.get('/', function (req, res) {
    // if(isLoggedIn) res.redirect('/profile')
    res.render('index');
})

// Protected Profile Rout: If the user is logged in, redirect them to the dashboard (check through isLoggedIn function)
app.get('/profile', isLoggedIn, async function (req, res) {
    let user = await userModel.findOne({ email: req.user.email }).populate("posts"); // Populate the posts field with the actual post data
    // console.log(user.posts.length);
    res.render('profile', { user });
})


// Post Like and Unlike 
app.get('/like/:id', isLoggedIn, async function (req, res) {
    let post = await postModel.findOne({ _id: req.params.id}).populate("user"); // Populate the user field with the actual user data

    if(post.likes.indexOf(req.user.userid)=== -1 ){
        post.likes.push(req.user.userid); // Add the user's id to the likes array
    }
    else{
        post.likes.splice(post.likes.indexOf(req.user.userid), 1);
    }


    await post.save();
    res.redirect('/profile');
})


// Post Edit (This rout only find the post and send the data on Front-End)
app.get('/edit/:id', isLoggedIn, async function (req, res) {
    let post = await postModel.findOne({ _id: req.params.id}).populate("user"); // Populate the user field with the actual user data
    res.render('edit', {post});
})

// Update the Post
app.post('/update/:id', isLoggedIn, async function (req, res) {
    let post = await postModel.findOneAndUpdate({ _id: req.params.id}, {content: req.body.content}); // find the post and update the content
    res.redirect('/profile');
})

// Delete the Post
app.get('/delete/:id', isLoggedIn, async function (req, res) {
    let post = await postModel.findOne({ _id: req.params.id}).populate('user'); // find the post 

    post.user.posts.splice(post.user.posts.indexOf(req.params.id), 1); // remove the post id from the user's posts array
    await post.user.save(); // Save the changes (Required)
    await postModel.deleteOne({_id: req.params.id}); // Delete the post from Post Document

    res.redirect('/profile');
})


// Create Post 
app.post('/post', isLoggedIn, async function (req, res) {
    let user = await userModel.findOne({ email: req.user.email }); // Get the user who logged in 
    let { content } = req.body;
    let post = await postModel.create({
        user: user._id,
        content
    });

    user.posts.push(post._id);
    await user.save();
    res.redirect('/profile'); // Redirect to the profile page
})

// Display the login form
app.get('/login', function (req, res) {
    res.render('login');
})

// Register New User (Create User)
app.post('/register', async function (req, res) {
    let { name, username, email, password, age } = req.body;
    let user = await userModel.findOne({ email });
    if (user) {
        return res.status(500).send("User already registered");
    }

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            let user = await userModel.create({
                name,
                username,
                age,
                email,
                password: hash
            })

            let token = jwt.sign({ email: email, userid: user._id }, "SecretKey");
            res.cookie("token", token);
            res.send("Registered");

        })
    })
})

// Perform User Login
app.post('/login', async function (req, res) {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) {
        return res.status(500).send("Something went wrong");
    }

    bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
            let token = jwt.sign({ email: email, userid: user._id }, "SecretKey");
            res.cookie("token", token);
            res.status(200).redirect("/profile");
        }
        else res.redirect('/login');
    })
})

// User logout
app.get('/logout', function (req, res) {
    res.cookie("token", "");
    res.redirect('/login');
})


// It is a middleware function to check if the user is logged in or not vie Cookies 
function isLoggedIn(req, res, next) {
    if (req.cookies.token === "") res.redirect("/login"); // if there is no token, the user is not logged in
    // if there is a token, the user is logged in
    else {
        let data = jwt.verify(req.cookies.token, "SecretKey");
        req.user = data;
        next();
    }
}



app.listen(3000);