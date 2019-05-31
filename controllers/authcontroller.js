var exports = module.exports = {};
var db = require("../models");

exports.signup = function (req, res) {
  res.render("signup");

};

exports.signin = function (req, res) {
  res.render("signin");

};

exports.dashboard = function (req, res) {

  db.User.findOne({
    where: {
      id: req.user
    }
  }).then(function (dataUser) {
    // console.log(dataUser);

    db.Selection.findAll({
      include: [{
        model: db.Task,
        where: {
          UserId: req.user
        },
        required: false
      }]
    }).then(function (dataSelect) {

      var viewObj = {
        User: dataUser,
        Selection: dataSelect
      };

      res.render("index", viewObj);

    });
  });
};

exports.logout = function (req, res) {
  req.session.destroy(function (err) {
    res.redirect("/signin");

  });
};