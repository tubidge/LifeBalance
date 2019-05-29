require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var passport = require("passport");
var session = require("express-session");
var bodyParser = require("body-parser");
require("dotenv").config();

// var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

app.get("/", function (req, res) {

  res.send("Welcome to Passport with Sequelize");

});


app.listen(PORT, function (err) {

  if (!err) { console.log("Site is live"); }
  else { console.log(err); }

});

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Passport

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true })); // session secret

app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions



//Models
var models = require("./app/models");

//Sync Database
models.sequelize.sync().then(function () {

  console.log("Nice! Database looks fine");

}).catch(function (err) {

  console.log(err, "Something went wrong with the Database Update!");

});



// Handlebars
// var hbsHelpers = exphbs.create({
//   helpers: require("./helpers/handlebars.js").helpers,
//   defaultLayout: "main",
//   extname: ".hbs"
// });

// app.engine(".hbs", hbsHelpers.engine);
// app.set("view engine", ".hbs");

// Handlebars
app.engine(
  "hbs",
  exphbs({
    defaultLayout: "main",
    extname: ".hbs"
  })
);
app.set("view engine", ".hbs");

// Routes
require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);
require("./routes/seed")(app);

//load passport strategies
require("./app/config/passport/passport.js")(passport, models.user);
var authRoute = require("./app/routes/auth.js")(app, passport);


var syncOptions = { force: false };



// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = false;
}

// Starting the server, syncing our models ------------------------------------/
// db.sequelize.sync(syncOptions).then(function () {
// app.listen(PORT, function () {
//   console.log(
//     "Listening on port %s. http://localhost:%s/",
//     PORT,
//     PORT
//   );
// });
// });

module.exports = app;


