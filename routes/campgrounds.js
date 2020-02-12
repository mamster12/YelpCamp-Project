var express 	= require("express"),
	router 		= express.Router(),
	Campground 	= require("../models/campground"),
	middleware = require("../middleware");

//INDEX - show all campgrounds
router.get("/", function(req, res){
	Campground.find({},function(err, allCampground){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/index", {campgrounds:allCampground});
		}
	});	
});

//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var NewCampground = {name: name, image: image, description: desc, author: author}
	Campground.create(NewCampground, function(err, newCampground){
		if(err){
			console.log(err);
		}else{
			console.log(newCampground);
			req.flash("success", "Campground successfully added!");
			res.redirect("/campgrounds");
		}
	});	
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/new");
});

//SHOW - show more info about one campground
router.get("/:id", function(req, res){
	//show campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		}else{
			//render show template with that campground
			res.render("campgrounds/show",{campground: foundCampground});
		}
	});	
});

//Edit Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
		Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
		}else{
				res.render("campgrounds/edit", {campground: foundCampground});			
		}
	});	
});

router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
	
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			req.flash("success", "Campground successfully updated!");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

//Delete campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err, delCampground){
		if(err){
			res.redirect("/campgrounds");
		}else{
			req.flash("success", "Campground successfully deleted!")
			res.redirect("/campgrounds");
		}
	});
});

module.exports = router;