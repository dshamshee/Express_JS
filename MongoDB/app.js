const express = require('express');
const app = express();
const userModel = require('./usermodel');



app.get('/', (req, res) => {
    res.send("Danish");
})


// Create Document
app.get('/create', async (req, res) => {
    let createduser = await userModel.create({
        name: "Nasreen",
        email: "Nasreen@gmail.com",
        username: "usernasreen"
    })

    res.send(createduser);
})


// Read Document
app.get('/read', async (req, res)=>{
    let users = await userModel.find();  // find gives (Array of Objects) & findOne gives (Single Object)
    res.send(users);
 })


// Update Document
app.get('/update', async (req, res) => {
    let updateduser = await userModel.findOneAndUpdate({ username: "userdanish" }, { name: "Danish Shamshee" }, { new: true })
    res.send(updateduser);
})


// Delete Document
app.get('/delete', async (req, res)=>{
   let users = await userModel.findOneAndDelete({username: "usernasreen"});  // find gives (Array of Objects) & findOne gives (Single Object)
   // The delete method gives you last one time acces of the user so you can perform any tasks with that like "Hello users.name your data has been deleted!"
   res.send(users);
   console.log(`Hello ${users.name} your data has been deleted!`)
})

app.listen(3000);