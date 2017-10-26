var express =   require("express");
var router  =   express.Router();
var Campground  =   require("../models/campground");
var Comment     =   require("../models/comment");
var middleware = require("../middleware");


//INDEX ROUTE - SHOW ALL CAMPGROUNDS
router.get("/", function(req, res){
    console.log(req.user);
    //GET ALL CAMPGROUNDS FROM DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds:allCampgrounds, page: 'campgrounds', currentUser: req.user});
        }
    });
        
});

//CREATE ROUTE - ADD NEW CAMPGROUND TO DB
router.post("/", middleware.isLoggedIn, function(req, res){
    
    //get data from form and add to campgrounds array
    var name    = req.body.name;
    var price   = req.body.price;
    var image   = req.body.image;
    var desc    = req.body.description;
    var author  = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, price: price, image: image, description: desc, author: author};
    console.log(req.user);
//CREATE NEW CAMPGROUND AND SAVE TO DB
Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
            req.flash("error", "Oops, something went wrong!");
        } else {
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });
});

//NEW ROUTE - SHOW FORM FOR NEW CAMPGROUND (RESTFUL ROUTES)
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

//SHOW ROUTE - INFO ON ONE ITEM (CAMPGROUND) ***THIS NEEDS TO BE LAST TO BE SURE OTHER PAGES DON'T GET TREATED AS :id****
router.get("/:id", function(req, res) {
    //find item by id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
            req.flash("error", "Oops, something went wrong!");
        }else{
            //render show of that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
    //req.params.id
    //render show page of that item
    
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
     Campground.findById(req.params.id, function(err, foundCampground){
         if(err){
             req.flash("error", "You can't do that!");         }
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    //find and update
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            req.flash("error", "You can't do that!");
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    //redirect to show page
});

// DESTROY! CAMPGROUND ROUTE
router.delete("/:id", middleware.isLoggedIn, middleware.checkCampgroundOwnership, function(req,res){
    // res.send("YOU ARE TRYING TO DELETE!!");
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            req.flash("error", "You can't do that!");
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;