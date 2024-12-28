const express = require('express')
 const app = express()


// Middleware 
// app.use(function(req, res, next){
//     console.log("Middleware run successfully.")
//     next()  // After performing their task it Send's the request to the next middleware or Rout
// })


// Middleware (We can create multiple middleware)
// app.use(function(req, res, next){
//     console.log("Middleware 2 run successfully.")
//     next()
// })


app.use(express.json())
app.use(express.urlencoded({extended: true}));


// Rout
 app.get("/", function(req, res){
    res.send("Hello Danish Shamshee")
 })


 // Rout
 app.get("/about", function(req, res){
    res.send("This is about page")
 })


 // Rout
 app.get("/profile", function(req, res, next){
    res.send("Done")
 })



//  app.use(function(err, req, res, next){
//     console.error(err.stack)
//     res.status(500).send("Ye Error Browser pe dikhega")
//  })


// Server Port
 app.listen(3000)