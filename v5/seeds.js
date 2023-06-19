var mongoose = require("mongoose"),
    Campground = require("./models/campground");
const campground = require("./models/campground");
    Comment = require("./models/comment");


var data = [
    {
        name: "Moutain Creek",
        image: "https://pixabay.com/get/g4aa760e169f89f8f30e5783be92f202db725a3abeb20408a30e8fc79c6dc89dbb7ab16abba6925f10633ab13d81ecaa1_340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Cloud Peak",
        image: "https://pixabay.com/get/g741a69756e21892018ed957edc4a88da35140d141848c3fdab7f2c9e7addd9c4f5934d66fe08209e054cc5154fa33103_340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Canyon Face",
        image: "https://pixabay.com/get/g79b4e3d5bde43a713dc70fee5850f8e2cc439ecc59e694178b7f366a8045f563326f97c6fc86e699741014361ae9f63c_340.jpg",
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