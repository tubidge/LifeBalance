var authController = require("../controllers/authcontroller.js");

module.exports = function (app, passport) {

  app.get("/signup", authController.signup);

  app.get("/signin", authController.signin);

  app.get("/logout", authController.logout);

  app.post("/signup", passport.authenticate("local-signup", {
    successRedirect: "/",
    failureRedirect: "/signup"
  }));

  app.post("/signin", passport.authenticate("local-signin", {
    successRedirect: "/",
    failureRedirect: "/dashboard"
  }), function (req, res) {
    // console.log(req.session.user);

  });

  app.get("/dashboard", authController.dashboard);

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/signin");
  }

};

