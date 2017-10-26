//ALL MIDDLEWARE GOES HERE
var middlewareObj = {};
var Campground      = require("../models/campground");
var Comment         = require("../models/comment");

middlewareObj.checkCampgroundOwnership =  function checkCampgroundOwnership (req, res, next){
// Is user logged in?
    if (req.isAuthenticated()){
      Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            req.flash("error", "Campground not found!");
            res.redirect("back");
        } else {
            // Does user own post?
            // console.log(foundCampground.author.id); // Mongoose object
            // console.log(req.user._id); // String
            if(foundCampground.author.id.equals(req.user._id)){
              next();
            } else {
                req.flash("error", "You can't do that!")
                res.redirect("back");
            }
        }
      });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back"); //Back to where they were
    }
};

middlewareObj.checkCommentOwnership = function checkCommentOwnership (req, res, next){
// Is user logged in?
if (req.isAuthenticated()){
  Comment.findById(req.params.comment_id, function(err, foundComment){
    if(err){
        res.redirect("back");
    } else {
        // Does user own comment?
        // console.log(foundCampground.author.id); // Mongoose object
        // console.log(req.user._id); // String
        if(foundComment.author.id.equals(req.user._id)){
          next();
            } else {
                req.flash("error", "Not yours to do that!");
                res.redirect("back");
            }
        }
      });
    } else {
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("back"); //Back to where they were
    }
};

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in!");
    res.redirect("/login");
};

module.exports = middlewareObj;
