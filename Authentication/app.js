// Authentication Unit 1:

// const cookieParser = require('cookie-parser'); // Install and import cookie-parser package
// const express = require('express')
// const app = express();
// app.use(cookieParser());  // Use the cookie-parser middleware
// const bcrypt = require('bcrypt'); // Install and import bcrypt package
// const jwt = require('jsonwebtoken'); // Install and import jsonwebtoken package

// app.get('/', function(req, res){
//    let token = jwt.sign({email: "danish@gmail.com"}, "secret"); // Generate a token
// //    console.log(token)
//    res.cookie("token", token); // Set the token as a cookie
//    res.send("done");
// })


// app.get("/read", function(req, res){
//     // console.log(req.cookies.token)
   //  let data = jwt.verify(req.cookies.token, "secret"); // Verify the token
   //  console.log(data);
// })

// app.listen(3000);


// Authentication Unit 2:

const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser'); // Install and import cookie-parser package
const userModel = require('./models/user'); // Import the user model 
const bcrypt = require('bcrypt'); // Install and import bcrypt package to hash passwords
const jwt = require('jsonwebtoken'); // Install and import jsonwebtoken package to generate and verify tokens

app.set("view engine", 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser())

app.get('/', function (req, res) {
   res.render("index");
})

// Create User and Generate Token to login 
app.post('/create', function (req, res) {
   let { username, email, password, age } = req.body;

   bcrypt.genSalt(10, function (err, salt) {
      // console.log(salt);
      bcrypt.hash(password, salt, async function (err, hash) {

         let createdUser = await userModel.create({
            username,
            email,
            password: hash, // Store the hashed password
            age
         })

         let token = jwt.sign({ email: email }, "secretKey");
         res.cookie("token", token); // Set the token as a cookie
         res.send(createdUser);

      })
   })
});

// Display the Login Form 
app.get("/login", function (req, res) {
   res.render("login");
})

// Verify user's details to login 
app.post("/login", async function (req, res) {
   let user = await userModel.findOne({ email: req.body.email }); // Find the user by email and store the value in <user> variable 
   if (!user) return res.send("Something went wrong !"); // Return an error message if the user is not found

   // Verify the password using bcrypt (user's password == hashed password)
   bcrypt.compare(req.body.password, user.password, function (err, result) {
      console.log(result); // This will print true if the password is correct, false otherwise
      if (result) {
         let token = jwt.sign({ email: user.email }, "secretKey");
         res.cookie("token", token); // Set the token as a cookie
         res.send("You are logged in !");

      } else res.send("Something went wrong !");
   })
})

// Logout User by removing the token from the cookie
app.get("/logout", function (req, res) {
   res.cookie('token', '');
   res.redirect("/");
})

app.listen(3000);