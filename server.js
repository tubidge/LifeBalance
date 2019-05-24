require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

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
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
require("./routes/seed")(app);

var syncOptions = { force: true };


// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = false;
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
