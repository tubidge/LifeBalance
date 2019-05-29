var db = require("../models");

module.exports = function (app) {

  // Load example page and pass in an example by id
  // app.get("/example/:id", function (req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  // Homepage
  app.get("/", function (req, res) {

    db.Selection.findAll({
      include: [db.Task]
    }).then(function (dataSelect) {

      var viewObj = {
        Selection: dataSelect
      };

      res.render("index", viewObj);

    });
  });


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