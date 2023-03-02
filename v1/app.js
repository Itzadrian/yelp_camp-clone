var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/cat_app");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
    {name: "Underwater Cave", image: "https://img.freepik.com/free-photo/hiker-stand-camping-front-orange-tent-backpack-mountains_1150-9163.jpg?size=626&ext=jpg&ga=GA1.2.1371213388.1666100182"},
    {name: "Hollow Grounds", image: "https://img.freepik.com/free-photo/group-man-woman-enjoy-camping-picnic-barbecue-lake-with-tents-background-young-mixed-race-asian-woman-man-young-people-s-hands-toasting-cheering-bottles-beer_1253-1041.jpg?size=626&ext=jpg&ga=GA1.2.1371213388.1666100182"},
    {name: "Seed Creek", image: "https://img.freepik.com/free-photo/full-shot-people-clinking-mugs_23-2148970115.jpg?size=626&ext=jpg&ga=GA1.2.1371213388.1666100182"},
    {name: "Underwater Cave", image: "https://img.freepik.com/free-photo/hiker-stand-camping-front-orange-tent-backpack-mountains_1150-9163.jpg?size=626&ext=jpg&ga=GA1.2.1371213388.1666100182"},
    {name: "Hollow Grounds", image: "https://img.freepik.com/free-photo/group-man-woman-enjoy-camping-picnic-barbecue-lake-with-tents-background-young-mixed-race-asian-woman-man-young-people-s-hands-toasting-cheering-bottles-beer_1253-1041.jpg?size=626&ext=jpg&ga=GA1.2.1371213388.1666100182"},
    {name: "Seed Creek", image: "https://img.freepik.com/free-photo/full-shot-people-clinking-mugs_23-2148970115.jpg?size=626&ext=jpg&ga=GA1.2.1371213388.1666100182"},
    {name: "Underwater Cave", image: "https://img.freepik.com/free-photo/hiker-stand-camping-front-orange-tent-backpack-mountains_1150-9163.jpg?size=626&ext=jpg&ga=GA1.2.1371213388.1666100182"},
    {name: "Hollow Grounds", image: "https://img.freepik.com/free-photo/group-man-woman-enjoy-camping-picnic-barbecue-lake-with-tents-background-young-mixed-race-asian-woman-man-young-people-s-hands-toasting-cheering-bottles-beer_1253-1041.jpg?size=626&ext=jpg&ga=GA1.2.1371213388.1666100182"},
    {name: "Seed Creek", image: "https://img.freepik.com/free-photo/full-shot-people-clinking-mugs_23-2148970115.jpg?size=626&ext=jpg&ga=GA1.2.1371213388.1666100182"},
    {name: "Underwater Cave", image: "https://img.freepik.com/free-photo/hiker-stand-camping-front-orange-tent-backpack-mountains_1150-9163.jpg?size=626&ext=jpg&ga=GA1.2.1371213388.1666100182"},
    {name: "Hollow Grounds", image: "https://img.freepik.com/free-photo/group-man-woman-enjoy-camping-picnic-barbecue-lake-with-tents-background-young-mixed-race-asian-woman-man-young-people-s-hands-toasting-cheering-bottles-beer_1253-1041.jpg?size=626&ext=jpg&ga=GA1.2.1371213388.1666100182"},
    {name: "Seed Creek", image: "https://img.freepik.com/free-photo/full-shot-people-clinking-mugs_23-2148970115.jpg?size=626&ext=jpg&ga=GA1.2.1371213388.1666100182"}
];

// Landing Page Route
app.get("/", function(req, res){
    res.render("landing");
});
// View All Campgrounds Route
app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds:campgrounds});
});
// Logic For Making New Campground And Adding To Array
app.post("/campgrounds", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    // redirect to campgrounds page
    res.redirect("/campgrounds");
});
// Form for New Campground
app.get("/campgrounds/new", function(req, res){
    res.render("new");
});
app.get("/*", function(req, res){
    res.send("Error Page Not Found");
});
app.listen(3000, function(){
    console.log("YelpCamp Server Has Started!");
});