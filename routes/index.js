var express 	= require("express"),
	router 		= express.Router(),
	passport 	= require("passport"),
	User 		= require("../models/user");

//route for Landing Page
router.get("/", function(req, res){
	res.render("landing");
});

//=============
//AUTH ROUTES
//============

//Route for Register Page
router.get("/register", function(req, res){
	res.render("register");	
});

//handle logic signup/registration
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			req.flash("error", err.message);
			console.log(err);
			res.redirect("/register");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome " + user.username + "!");
			res.redirect("/campgrounds");
			console.log(newUser);
		});
	});
});

//Route for Login Page
router.get("/login", function(req, res){
	res.render("login");
});

//handle logic for Login authentication
router.post("/login", passport.authenticate("local", {
	successRedirect: "/campgrounds",
	failureRedirect: "/login",
	failureFlash: true
	}),function(req, res){
});

//logout route logic
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "You logged out successfully!");
	res.redirect("/campgrounds");
});


module.exports = router;