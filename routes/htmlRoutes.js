var db = require("../models");

module.exports = function (app) {

  // Homepage
  // app.get("/", function (req, res) {

  //   console.log("log from route");
  //   console.log(req.session);

  //   db.Selection.findAll({
  //     include: [{
  //       model: db.Task,
  //       where: {
  //         UserId: req.session.passport.user
  //       },
  //       required: false
  //     }]
  //   }).then(function (dataSelect) {
  //     console.log(dataSelect);
  //     var viewObj = {
  //       Selection: dataSelect
  //     };

  //     res.render("index", viewObj);

  //   });
  // });


  // Signup
  // app.get("/signup", function (req, res) {
  //   res.render("signup");
  // });

  // app.post("/signup", function (req, res) {
  //   console.log(req.body);

  //   db.User.create(req.body).then(function (userData) {
  //     res.json(userData);
  //     console.log(userData);

  //   });
  // });

  // // Login
  // app.get("/login", function (req, res) {
  //   res.render("login");
  // });


  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });

};