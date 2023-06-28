var Campground = require("../models/campground")
var Comment = require("../models/comment")
//ALL MIDDLEWARE GOES HERE
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id.trim(), function(err, foundCampground){
            if(err){
                console.log(err);
                res.redirect("back");
            }
            else{
                //does user own campground
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    res.redirect("back")
                }
            };
        });
    }
    else{
        res.redirect("back")
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id.trim(), function(err, foundComment){
            if(err){
                console.log(err);
                res.redirect("back");
            }
            else{
                //does user own campground
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    res.redirect("back")
                }
            };
        });
    }
    else{
        res.redirect("back")
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = middlewareObj