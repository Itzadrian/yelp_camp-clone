var mongoose = require("mongoose"),
    Campground = require("./models/campground");
const campground = require("./models/campground");
    Comment = require("./models/comment");


var data = [
    {
        name: "Moutain Creek",
        image: "https://pixabay.com/get/gbdb66616d20581bc11c14603b92c96f60ab6472073a74895fccb62c01091da4d237d7e8eaa8290044f7518d032660d23_340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Cloud Peak",
        image: "https://pixabay.com/get/g71c5f818ecfd1263efd3ced1d48370e4bedb63de21e7634c81122b3768f0110fde6316b5ae4a42b1c310ad22d7fc9905_340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Canyon Face",
        image: "https://pixabay.com/get/g950a95e1bed46a5b33a1d692f1a383963efe546c3d03f13437dfafb425f662384d60c6616c2f0b9cec59580a4b9b0134_340.jpg",
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