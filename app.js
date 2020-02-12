var express		 	= require("express"),
 	app 		 	= express(),
	bodyParser   	= require("body-parser"),
	methodOverride	= require("method-override"),
 	mongoose 	 	= require("mongoose"),
	passport		= require("passport"),
	localStrategy 	= require("passport-local"),
	Campground   	= require("./models/campground"),
	User			= require("./models/user"),
	Comment 	 	= require("./models/comment"),
	flash 			= require("connect-flash"),
	seedDB       	= require("./seeds");

//requiring routes
var indexRouter 	 = require("./routes/index"),
	campgroundRouter = require("./routes/campgrounds"),
	commentRouter 	 = require("./routes/comments");


//CONNECT TO DATABASE - MONGODB ATLAS
mongoose.connect('mongodb+srv://macvillegas:mac1q2w3e4r5t@cluster0-mspvq.mongodb.net/YelpCamp_v11?retryWrites=true&w=majority', {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true
}).then(() => {
	console.log('You are connected to DB!')
}).catch(err => {
	console.log('ERROR', err.message);
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "I saw, I came, I Conquer",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser()); 

//middleware for currentUser confirmation
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

//calling the needed routes
app.use(indexRouter);
app.use("/campgrounds", campgroundRouter);
app.use("/campgrounds/:id/comments", commentRouter);

//Starting the Server

app.listen(3000, function(){
	console.log("The YelpCamp Server Has Started!");
});