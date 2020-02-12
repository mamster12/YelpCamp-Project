var Campground = require("../models/campground");
var Comment	   = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
	//check if user is logged in
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
		}else{
			//check if currentuser is equal to campground author
			if(foundCampground.author.id.equals(req.user._id)){
				next();
			}else{
				res.redirect("back");
			}			
		}
	});
	}else{
		res.redirect("back");
	}
}

middlewareObj.checkCommentOwnership = function(req, res, next){
	//check if user is logged in
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back");
		}else{
			//check if currentuser is equal to comment author
			if(foundComment.author.id.equals(req.user._id)){
				next();
			}else{
				res.redirect("back");
			}			
		}
	});
	}else{
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "Please Log in");
	res.redirect("/login");
}

module.exports = middlewareObj;