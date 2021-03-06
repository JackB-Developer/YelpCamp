var express =   require("express");
var router  =   express.Router();
var passport    =   require("passport");
var User        =   require("../models/user");


router.get("/", function(req, res){
    res.render("landing");
});

// ===============
// AUTH ROUTES
// ===============

// SHOW REGISTER FORM
router.get("/register", function(req, res) {
    res.render("register", {page: 'register'});
});
// HANDLE SIGN UP LOGIC
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

// SHOW LOGIN FORM
router.get("/login", function(req, res){
    res.render("login", {page: 'login'});
});
// HANDLES LOGIN LOGIC
//router.post("/route", middleware, callback)
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
    
});

// Logout ROUTE LOGIC
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
