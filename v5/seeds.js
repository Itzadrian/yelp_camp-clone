var mongoose = require("mongoose"),
    Campground = require("./models/campground");
const campground = require("./models/campground");
    Comment = require("./models/comment");


var data = [
    {
        name: "Moutain Creek",
        image: "https://pixabay.com/get/g978ec832e150b2acce29a753f6c835536eaf1f18da1976f488b8a5d5e54d94ed940ab9d7aa10d71ccc07e00ce2043d62_340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Cloud Peak",
        image: "https://pixabay.com/get/ga3c3b3a1dd724ceea02c09423beb6382fc82e26a413184f62b223ed6179440ca12f2b415f2e4501b2c81b433db7b2bc7_340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Canyon Face",
        image: "https://pixabay.com/get/g0650193bb08ef3686a7aef5050fe6870cfd29f0a14a7a7c6c6b77c2628c09e73d81902216a9e25404b74a9232492daba_340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]


function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("Removed campgrounds!");
        // Remove comments
        Comment.remove({}, function(err){
            if(err){
                console.log(err);
            }
            console.log("removed comments!!");
            // add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("added a campground");
                        // create comment
                        Comment.create(
                            {
                                text: "This place is great and peaceful but no internet",
                                author: "Dominic"
                            },
                            function(err, comment){
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    campground.comments.push(comment._id);
                                    campground.save();
                                    console.log("Created new comment")
                                }
                            }
                        )
                    }
                });
            });
        });
    
    });
}







module.exports = seedDB;