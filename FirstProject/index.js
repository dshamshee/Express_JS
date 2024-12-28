const path = require('path')
const express = require('express');
const app = express();

// Parsers
app.use(express.json())
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the public folder
app.set('view engine', 'ejs'); // Set the view engine to ejs

app.get("/", function(req, res){
    res.render("index");  // render the index.ejs file
})

// Static Rout
// app.get("/profile/danish", function(req, res){
//   res.send("Danish Profile");  // render the index.ejs file
// })


// Dynamic Rout <username> is treated like a variable (Dynamic)
app.get("/profile/:username", function(req, res){
  let user = req.params.username; // params: Jiske aage collon ':' ho 
  res.send(`Welcome ${user}`);  // render the index.ejs file
})



app.get("/profile/:username/:age", function(req, res){
  let user = req.params.username; // params: Jiske aage collon ':' ho 
  let age = req.params.age; 
  // res.send(`Welcome ${user} and your age: ${age}`);  // render the index.ejs file
  res.send(req.params)
})


app.listen(3000, function(){
  console.log("Server Start Successfull")  
})

