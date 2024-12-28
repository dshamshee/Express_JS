const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user'); // Import the user model
const postModel = require('./models/post'); // Import the post model
const bcrypt = require('bcrypt'); // Import the bcrypt library for password hashing
const jwt = require('jsonwebtoken');



app.set("view engine", 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// Index route
// app.get('/', async function (req, res) {
//     let data = jwt.verify(req.cookies.token, "secretString");
//     console.log(data.email)
//     const userEmail = data.email;
//     if(userEmail){
//         let user = await userModel.findOne({email: userEmail });
//         res.render("dashbord", {user});
//         console.log(user);
//     }else{
//         res.render("index");
//     }
//     // res.render("index");
//  })


// ChatGPT Answer
app.get('/', async function (req, res) {
    const token = req.cookies?.token; // Safe access (check if cookie exist or not)
    if (!token) {
        return res.status(401).render("index"); // Redirect to login if no token
    }

    // If Cookie exist, verify the token and display the User Dashboard
    try {
        const data = jwt.verify(token, "secretString");
        const userEmail = data.email;
        if (userEmail) {
            let user = await userModel.findOne({ email: userEmail });
            // Use Promise.all to fetch all posts
            let postID = user.posts; // It is an array of post IDs
            let allPosts = await Promise.all(
                postID.map(async (element) => {
                    return await postModel.findOne({ _id: element });
                })
            );

            res.render("dashbord", { user, allPosts });
        } else {
            res.render("index");
        }
    } catch (error) {
        console.error("JWT verification error:", error.message);
        res.status(403).render("index"); // Redirect to login on invalid token
    }
});




// Create User
app.post('/create', function (req, res) {
    let { username, email, password } = req.body;

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            const createdUser = await userModel.create({
                username,
                email,
                password: hash,
            })
            const token = jwt.sign({ email: email }, "secretString");
            res.cookie("token", token);
            res.send(createdUser)
        })
    })
})

// Login Page
app.get('/login', function (req, res) {
    res.render('login');
})

// Login User
app.post('/logeduser', async function (req, res) {
    let user = await userModel.findOne({ email: req.body.email });

    if (!user) return res.send("Something went wrong");
    bcrypt.compare(req.body.password, user.password, async function (err, result) {
        if (result) {
            let token = jwt.sign({ email: user.email }, "secretString");
            res.cookie('token', token);

            // Use Promise.all to fetch all posts
            // let postID = user.posts; // It is an array of post IDs
            // let allPosts = await Promise.all(
            //     postID.map(async (element) => {
            //         return await postModel.findOne({ _id: element });
            //     })
            // );

            // res.render("dashbord", { user, allPosts });
            res.redirect('/');

        } else {
            res.send("Something wnet wrong");
        }
    })
})

app.post('/createpost', async function (req, res) {
    let { title, email, image } = req.body;
    let user = await userModel.findOne({ email: email });

    let post = await postModel.create({
        title,
        image,
        user: user._id
    })
    user.posts.push(post._id);
    user.save()
    res.redirect('/');
})

// Logout User
app.get('/logout', function (req, res) {
    res.cookie('token', '');
    res.redirect('/');
})




app.listen(3000);