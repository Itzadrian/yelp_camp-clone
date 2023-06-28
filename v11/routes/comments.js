var express    = require("express"),
    router     = express.Router({mergeParams: true}),
    Campground = require("../models/campground"),
    Comment    = require("../models/comment"),
    middleware = require("../middleware")




//Comments New
router.get("/new", middleware.isLoggedIn, function(req, res){
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
router.post("/", middleware.isLoggedIn, function(req, res){
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
                    req.flash("error", "Something went wrong!")
                    console.log(err);
                }
                else{
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    // connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    // redirect to campground show page
                    console.log(comment);
                    req.flash("success", "Successfully added comment")
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })
})

//EDIT COMMENT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Campground.findById(req.params.id.trim(), function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error", "No campground found");
            return res.redirect("back")
        }
        Comment.findById(req.params.comment_id.trim(), function(err, foundComment){
            if(err){
                console.log(err);
                res.redirect("back")
            }
            else{
                res.render("comments/edit", {campground_id: req.params.id.trim(), comment: foundComment});
            }
        });
    });
});

//UPDATE COMMENT ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id.trim(), req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
            console.log(err);
        }
        else{
            res.redirect("/campgrounds/" + req.params.id.trim());
        }
    })
});

//DESTROY COMMENT ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndDelete(req.params.comment_id.trim(), function(err, deletdComment){
        if(err){
            res.redirect("back");
            console.log(err);
        }
        else{
            req.flash("success", "Comment deleted")
            res.redirect("/campgrounds/" + req.params.id.trim());
        }
    })
})

module.exports = router;