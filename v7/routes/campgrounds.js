var express = require("express"),
    router  = express.Router({mergeParams: true}),
    Campground = require("../models/campground"),
    Comment = require("../models/comment")



// INDEX - Show all campgrounds
// View All Campgrounds Route
router.get("/", function(req, res){
    // Get all campgrounds from db
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index", {campgrounds:allCampgrounds});
        }
    });
});

// CREATE - add new campground to DB
// Logic For Making New Campground And Adding To Array
router.post("/", function(req, res){
    // get data from form and add to campgrounds DB
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    // create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }
        else{
            // redirect to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

// NEW form to create new campground
// form for New Campground
router.get("/new", function(req, res){
    res.render("campgrounds/new");
});

// SHOW Shows more info about one campground
router.get("/:id", function(req, res){
    // save Campground id to variable and trim
    var campgroundid = req.params.id.trim();
    // find campground with provided id
    Campground.findById(campgroundid).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
            console.log(campgroundid);
        }
        else{
            console.log(foundCampground);
            // render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
            console.log(campgroundid);
        }
    });
});

//Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;