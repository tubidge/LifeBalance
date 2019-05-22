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

  app.get("/", function (req, res) {

    db.Selection.findAll({})
      .then(function (dataSelect) {

        db.Task.findAll({})
          .then(function (dataTasks) {

          var viewObj = {
            Selection: dataSelect,
            Tasks: dataTasks
          };
          res.render("index", viewObj);

        });
      });
  });

  app.get("/signup", function (req, res) {
    res.render("signup");

  });

  app.post("/signup", function (req, res) {
    console.log(req.body);

    db.User.create(req.body).then(function (userData) {
      res.json(userData);
      console.log(userData);

    });
  });

  app.get("/login", function (req, res) {
    res.render("login");

  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};




