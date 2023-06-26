var mongoose = require("mongoose"),
    Campground = require("./models/campground");
const campground = require("./models/campground");
    Comment = require("./models/comment");


var data = [
    {
        name: "Moutain Creek",
        image: "https://img.freepik.com/free-photo/field-with-tents-surrounded-by-hills-covered-greenery-cloudy-sky-during-sunset_181624-13981.jpg?size=626&ext=jpg&ga=GA1.1.1171882125.1686311260&semt=sph",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Cloud Peak",
        image: "https://img.freepik.com/free-photo/beautiful-scenery-yellow-tents-kilimanjaro-national-park_181624-36749.jpg?size=626&ext=jpg&ga=GA1.2.1171882125.1686311260&semt=sph",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Canyon Face",
        image: "https://img.freepik.com/free-photo/beautiful-view-scenic-horseshoe-bend-arizona_493961-821.jpg?size=626&ext=jpg&ga=GA1.1.1171882125.1686311260&semt=sph",
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