"use strict";
module.exports = function (_ ,passport ,user) {
    return {
        SetRouting: function (router) {
            router.get("/", this.indexPage);
            router.get("/signup",this.getsignPage);
            router.get("/login",this.getloginPage);
            router.post("/signup",user.SignupValidation,this.postsignPage);
            router.post("/login",this.postloginPage)
        },
        indexPage: function (req, res) {
            return res.render("index", { test:"This is test message" });
        },
        getsignPage:function(req,res){
            var error=req.flash("error");
            return res.render("signup",{message:error,hasError:error.length>0});
        },
        getloginPage:function(req,res){
            var error=req.flash("error");
            return res.render("login",{message:error,hasError:error.length>0});
        },
        postsignPage:passport.authenticate('local.signup', { 
            successRedirect: '/',
            failureRedirect: '/signup',
            failureFlash: true 
        }),
        postloginPage:passport.authenticate('local.login', { 
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true 
            }), 
    }
}