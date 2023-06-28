var express  = require("express"),
    router   = express.Router(),
    passport = require("passport"),
    User     = require("../models/user")


// Landing Page Route
router.get("/", function(req, res){
    res.render("landing");
});

//=============
//SHOW REGISTER FORM
//=============
router.get("/register", function(req, res){
    res.render("register");
});
//===============
//HANDLING USER SIGN UP
//===============
router.post("/register", async function(req, res){
    try{
        var newUser = await User.register({username: req.body.username.trim()}, req.body.password.trim());
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        })
    }
    catch(err){
        console.log(err);
        return res.redirect("/register");
    }
});

//================
//SHOW LOGIN FORM
//================
router.get("/login", function(req, res){
    res.render("login");
});
//===============
//HANDLING USER LOGIN
//===============
router.post("/login", passport.authenticate("local", {
    successRedirect: "campgrounds",
    failureRedirect: "login"
}), function(){});
//=================
//HANDLING USER LOGOUT
//=================
router.get("/logout", function(req, res){
    req.logout(function(err){
        if(err){
            console.log(err);
            res.redirect("/")
        }
        res.redirect("/")
    });
});

//Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

// Error page route
// router.get("/*", function(req, res){
//     res.render("error");
// });

module.exports = router;