var express = require("express");
var http = require("http");
var bodyParser = require("body-parser");
var container = require("./container.js");
var cookieParser = require("cookie-parser");
var validator = require("express-validator");
var flash = require("connect-flash");
var session=require("express-session");
var ejs = require("ejs");
var MongoStore=require("connect-mongo")(session);
var mongoose=require("mongoose");
var passport = require("passport");

// Calling the server
container.resolve(function (users, _ ) {
    mongoose.connect('mongodb://localhost/SoChem',{ useNewUrlParser: true });
    mongoose.set('useCreateIndex', true);
    mongoose.Promise = global.Promise;
    var app = SetUpExpress();
    function SetUpExpress() {
        var app = express();
        var server = http.createServer(app);
        server.listen(8000, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log("Server is running on the port 8000");
            }
        });
        // Using the Function to call the dependencies
        ConfigureExpress(app);
        var router = require("express-promise-router")();
        users.SetRouting(router);
        app.use(router);
    }
    //Calling the dependencies
    function ConfigureExpress(app) {
        require("./passport/passport-local");
        app.use(cookieParser());
        app.use(express.static("public"));
        app.set("view engine", "ejs");
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json());
        app.use(validator());
        app.use(session({
            secret: 'keyboard cat',
            resave: true,
            saveUninitialized: true,
            store:new MongoStore({mongooseConnection:mongoose.connection})
          }))
        app.use(flash());
        app.use(passport.initialize());
        app.use(passport.session());
        app.locals._=_;
    }
});