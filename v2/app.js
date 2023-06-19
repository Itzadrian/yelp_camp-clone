var express = require("express"),
 app        = express(),
 bodyParser = require("body-parser"),
 mongoose   = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/yelp_camp");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//======================================================================================
//DATABASE CODE
//======================================================================================

// Schema Setup
// var {Schema} = mongoose;
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
});

var Campground = mongoose.model("Campground", campgroundSchema);

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
            res.render("index", {campgrounds:allCampgrounds});
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
    res.render("new");
});

// SHOW Shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    // save Campground id to variable and trim
    var campgroundid = req.params.id.trim();
    // find campground with provided id
    Campground.findById(campgroundid, function(err, foundCampground){
        if(err){
            console.log(err);
            console.log(campgroundid);
        }
        else{
            // render show template with that campground
            res.render("show", {campground: foundCampground});
            console.log(campgroundid);
        }
    });
});
app.get("/*", function(req, res){
    res.render("error");
});
app.listen(3000, function(){
    console.log("YelpCamp Server Has Started!");
});