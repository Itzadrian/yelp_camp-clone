var express    = require("express"),
 app           = express(),
 bodyParser    = require("body-parser"),
 mongoose      = require("mongoose"),
 Campground    = require("./models/campground"),
 passport      = require("passport"),
 LocalStrategy = require("passport-local")
 Comment       = require("./models/comment"),
 User          = require("./models/user"),
 seedDB        = require("./seeds");


//Requiring Routes
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index")
//======================================================================================
//APP CONFIG
//======================================================================================
mongoose.connect("mongodb://127.0.0.1:27017/yelp_camp");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

//========================================
//PASSPORT CONFIG
//=======================================
app.use(require("express-session")({
    secret: "I love programming, anime and read mangas",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})

//======================
//ROUTES CONFIG
//======================
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

//Server logic
app.listen(3000, function(){
    console.log("YelpCamp Server Has Started!");
});