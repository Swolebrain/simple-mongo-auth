"use strict";
let express = require('express');
let app = express();
let port = 8080;
let session = require('express-session');
let MongoStore = require('connect-mongodb-session')(session);
let bodyParser = require('body-parser');

//enabling CORS - this is how you fix the error about
//"No Access-Control-Allow-Origin header is present"
app.use((req,res,next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(bodyParser.urlencoded({extended: true}));
//connect-mongodb-session
let store = new MongoStore({
        uri: 'mongodb://kanye:kanyekanye@ds011893.mlab.com:11893/kanyewest',
        collection: 'sessions'
});

store.on('error', function(error) {
  console.log(error);
  assert.ifError(error);
  assert.ok(false);
});

app.use(session({
    secret: "Kanye West is the god of gods of all men" ,
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 1000*60*60 },
    store: store
}));






app.get("/", (req,res) => {
  if (req.session.isAuthenticated)
    res.end("You logged in nigga!");
  else {
    res.end(`
      <!DOCTYPE html>
      <html>
      <head></head>
      <body>
        <form action="/login" method="POST">
        <input type="text" name="username" value="">
        <input type="text" name="password" value="">
        <input type="submit" value="Send form">
        </form>
      </body>
      </html>
    `);
  }
});

app.post('/login', (req, res) => {

  if (req.body.username === "nigger"){
    req.session.isAuthenticated = true;
    console.log(req.session);
    res.end("You logged in nigga!");
  }
  else{
    console.log("auth failed - "+JSON.stringify(req.body));
    res.end("Auth failed");
  }
});

app.listen(port);
console.log(`App listening on port ${port}`);
