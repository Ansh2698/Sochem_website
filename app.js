var express = require("express");
var http = require("http");
var bodyParser = require("body-parser");
var container = require("./container.js");
var cookieParser = require("cookie-parser");
var validator = require("express-validator");
var flash = require("connect-flash");
var ejs = require("ejs");
var passport = require("passport");
container.resolve(function (users, _ ) {
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
        ConfigureExpress(app);
        
        var router = require("express-promise-router")();
        users.SetRouting(router);
        app.use(router);
    }
    function ConfigureExpress(app) {
        
        app.use(cookieParser());
        app.use(express.static("public"));
        app.set("view engine", "ejs");
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json());
        app.use(validator());
       
        app.use(flash());
        app.use(passport.initialize());
        app.use(passport.session());
        app.locals._=_;
    }
});