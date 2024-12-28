## To hash a Password (copied from npmjs.com/package/bcrypt)
```js
// This code is used to Hash the Password (copied from npmjs.com/package/bcrypt)
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash("danish786", salt, function(err, hash) {
            <!-- Store hash in your password DB. -->
            console.log(hash);
        });
    });
```

## To Verify the Password (copied from npmjs.com/package/bcrypt)
```js
// First It convert the password to hash and then compare it with the hash in the database
bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
    // result == true
    <!-- First It convert the password to hash and then compare it with the hash in the database -->
    console.log(result);
});
```


## Create a JWT Token (Copied from github.com/auth0/node-jsonwebtoken)
```js
const jwt = require('jsonwebtoken');
let token = jwt.sign({email: "danish@gmail.com"}, "secret");
// 'secret' is a unique string that you should keep secret. Using this string the unique token is created for a user 
res.cookie("token", token); // Send the token to the client (Browser) as a cookie
```

## Verigy the JWT Token
```js
let data = jwt.verify(req.cookies.token, "secret");
// Using that 'secret' string the token is verified and the data is extracted from the token
```
## To Retrieve the Cookie 
```js
const cookieParser = require('cookie-parser');
app.use(cookieParser());
// Now you can access the cookie using req.cookies
```


## Set & Retrieve the Cookie
```js
res.cookie("Token", "Danish"); // Set the cookie on the Browser 
console.log(req.cookie); // Retrieve All the Cookie 
console.log(req.cookie.Token); // Retrive only the Token Cookie
```