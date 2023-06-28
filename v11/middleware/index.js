var Campground = require("../models/campground")
var Comment = require("../models/comment")
//ALL MIDDLEWARE GOES HERE
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id.trim(), function(err, foundCampground){
            if(err || !foundCampground){
                req.flash("error", "Campground not found")
                console.log(err);
                res.redirect("back");
            }
            else{
                //does user own campground
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash("error", "You Don't Have Permission")
                    res.redirect("back")
                }
            };
        });
    }
    else{
        req.flash("error", "You need to be logged in")
        res.redirect("/login")
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id.trim(), function(err, foundComment){
            if(err || !foundComment){
                req.flash("error", "Comment not found")
                console.log(err);
                res.redirect("back");
            }
            else{
                //does user own campground
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash("error", "Yon don't have permission")
                    res.redirect("back")
                }
            };
        });
    }
    else{
        req.flash("error", "You need to be logged in")
        res.redirect("/login")
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in")
    res.redirect("/login");
}

module.exports = middlewareObj