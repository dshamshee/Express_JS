/* 
Write File 
Append File 
Copy File 
Rename
Unlink 
*/

const fs = require('node:fs'); // fs = File System 


// Write File 
// fs.writeFile("NewFile.txt", "Hello Everyone My name is Danish Shamshee", function(err){
//     if(err) console.log(err);
//     else
//         console.log("File Created Successfully.")
// })


// Append File 
// fs.appendFile("NewFile.txt", " and I'm a Software Developer", function(err){
//     if(err) console.log(err);
//     else
//         console.log("File Created Successfully.")
// })


//Rename File
// fs.rename("NewFile.txt", "RenamedFile.txt", function(err){
//     if(err) console.log(err)
//     else console.log("File Renamed  Successfully.")
// })



// Copy File 
// fs.copyFile("RenamedFile.txt", "./copy/copiedFile.txt", function(err){
//     if(err) console.log(err.message)
//         else console.log("File Copied Successfully.")
// })



// Delete File 
// fs.unlink("./copy/copiedFile.txt", function(err){
//     if(err) console.error(err)
//         else console.log("File Deleted Successfully.")
// })


// Delete Folder/Directory  (By Default it delete empty Folder)
// fs.rmdir("./copy2", function(err){
//     if(err) console.log(err)
//         else console.log("Folder Deleted Successfully.")
// })


// Delete Non-Empty Folder/Directory 
// fs.rmdir("./copy", {recursive: true}, function(err){
//     if(err) console.log(err)
//         else console.log("Folder Deleted")
// })


// Method-2 Delete Non-Empty Folder/Directory
// fs.rm("./copy", {recursive: true}, function(err){
//     if(err) console.log(err)
//         else console.log("Folder Deleted Successfully.")
// })



// Create a  New Folder/Directory 
// fs.mkdir("./copy/FolderCreated", function(err){
//     if(err) console.error(err)
//         else console.log("Folder Created Successfully.")
// })


// Read a Folder/Directory 
// Note: Reads the contents of a directory. The callback gets two arguments (err, files) where files is an array of the names of the files in the directory excluding '.' and '..'.
fs.readdir("./copy/FolderCreated", { recursive: true }, function (err, files) {
    if (err) console.error(err)
    else {
        console.log(files)
    }
})