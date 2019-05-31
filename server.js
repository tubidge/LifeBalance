require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var passport = require("passport");
var session = require("express-session");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;


// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));


// For Passport
app.use(session({ secret: "keyboard cat", resave: false, saveUninitialized: false })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


// Handlebars
var handlebars = require("./helpers/handlebars.js")(exphbs);
app.engine(".hbs", handlebars.engine);
app.set("view engine", ".hbs");


// Routes
require("./routes/auth")(app, passport);
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
require("./routes/seed")(app);
// test
require("./color_changes")(app);


//load passport strategies
require("./config/passport/passport.js")(passport, db.User);

var syncOptions = { force: true };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
// db.sequelize.sync(syncOptions).then(function () {
app.listen(PORT, function () {
  console.log(
    "Listening on port %s. http://localhost:%s/",
    PORT,
    PORT
  );
});
// });

module.exports = app;


