var express    = require("express"),
    router     = express.Router({mergeParams: true}),
    Campground = require("../models/campground"),
    Comment    = require("../models/comment")




//Comments New
router.get("/new", isLoggedIn, function(req, res){
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

//Comments Create
router.post("/", isLoggedIn, function(req, res){
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
                    //add username and id to comment
                    comments.author.id = req.user._id;
                    comments.author.username = req.user.username;
                    //save comment
                    comments.save();
                    // connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    // redirect to campground show page
                    console.log(comment);
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })
})

//Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;