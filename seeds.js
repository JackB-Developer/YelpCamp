var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");

var data = [
    {
        name:   "Cloud's Rest",
        image:  "http://cdn-image.travelandleisure.com/sites/default/files/styles/720x450/public/1443561122/CAMPING0915-Glacier-National-Park.jpg?itok=HOYtWwYB",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name:   "Cloud's Stay",
        image:  "http://cdn.shopify.com/s/files/1/0795/3649/files/Camping-Near-The-Lake-Background-Wallpaper.jpg?10608747750552098607",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name:   "Desert's Rest",
        image:  "http://www.myharriman.com/wp-content/uploads/2013/07/camping_at_night.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
] 

function seedDB(){
    // REMOVE ALL CAMPGROUNDS
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
            console.log("Removed Campgrounds!");
            // ADD A FEW CAMPGROUNDS
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("Added a campground!");
                        //create a comment
                        Comment.create(
                            {
                                text:   "This place is great",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                }
                            });
                    }
                });
            });
    });
    
    
    // ADD A FEW COMMENTS
    
}

module.exports = seedDB;
