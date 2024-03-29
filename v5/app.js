var express = require("express"),
 app        = express(),
 bodyParser = require("body-parser"),
 mongoose   = require("mongoose"),
 Campground = require("./models/campground"),
 Comment = require("./models/comment"),
 seedDB     = require("./seeds");

//======================================================================================
//APP CONFIG
//======================================================================================
mongoose.connect("mongodb://127.0.0.1:27017/yelp_camp");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

//======================================================================================
//DATABASE CODE
//======================================================================================

//=============================================================================================
//ROUTES
//=============================================================================================

// Landing Page Route
app.get("/", function(req, res){
    res.render("landing");
});

// INDEX - Show all campgrounds
// View All Campgrounds Route
app.get("/campgrounds", function(req, res){
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
app.post("/campgrounds", function(req, res){
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
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
});

// SHOW Shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
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

//=============================================================================================
//COMMENTS ROUTES
//=============================================================================================

app.get("/campgrounds/:id/comments/new", function(req, res){
    //Find campground by id
    Campground.findById(req.params.id.trim(), function(err, campground){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", function(req, res){
    // find campground with ID
    Campground.findById(req.params.id.trim(), function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
            // create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }
                else{
                    // connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    // redirect to campground show page
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })
})






// Error page route
app.get("/*", function(req, res){
    res.render("error");
});
app.listen(3000, function(){
    console.log("YelpCamp Server Has Started!");
});