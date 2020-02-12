var mongoose = require("mongoose"),
	Campground = require("./models/campground"),
	Comment = require("./models/comment");

var data = [
			{
				name: "VALE OF PICKERING", 
				image: "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
				description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
			},
			{
				name: "CASTEL CAMPING", 
				image: "https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
				description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
			},
			{
				name: "PLAYA MONTROIG CAMPING", 
				image: "https://images.pexels.com/photos/1309586/pexels-photo-1309586.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
				description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
			}			
	];
	
//create a function for seeding

function seedDB(){
	Campground.deleteMany({}, function(err){
		if(err){
			console.log(err);
		}
		
		console.log("campgrounds remove!");
		
		data.forEach(function(campground){
			Campground.create(campground, function(err, campCreated){
				if(err){
					console.log(err);
				}else{
					console.log("campground created!");
					Comment.create({
						text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
						author: "Mcvilla"
					},function(err, comment){
						if(err){
							console.log(err);
						}else{
							console.log("comment added!")
							campCreated.comments.push(comment);
							campCreated.save(function(err, camp){
								if(err){
									console.log(err);
								}else{
									
								}
							});
							
						}
					});
				}
			});
		});
	});
}

module.exports = seedDB;