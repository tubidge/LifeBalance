var authController = require("../controllers/authcontroller.js");

module.exports = function (app, passport) {

  app.get("/signup", authController.signup);

  app.get("/signin", authController.signin);

  app.post("/signup", passport.authenticate("local-signup", {
    successRedirect: "/",

    failureRedirect: "/signup"
  }
  ));


  app.get("/", isLoggedIn, authController.dashboard);

  app.get("/logout", authController.logout);

  app.post("/signin", passport.authenticate("local-signin", {
    successRedirect: "/",

    failureRedirect: "/signin"
  }
  ));


  function isLoggedIn(req, res, next) {

    if (req.isAuthenticated()) { return next(); }

    res.redirect("/signin");

  }

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });

};





