var exports = module.exports = {};

exports.signup = function (req, res) {
  res.render("signup");

};

exports.signin = function (req, res) {
  res.render("signin");

};

exports.dashboard = function (req, res) {

  console.log("log from route");
  console.log(req.session);

  db.Selection.findAll({
    include: [{
      model: db.Task,
      where: {
        UserId: req.session.passport.user
      },
      required: false
    }]
  }).then(function (dataSelect) {
    console.log(dataSelect);
    var viewObj = {
      Selection: dataSelect
    };

    res.render("index", viewObj);

  });
};


exports.logout = function (req, res) {
  req.session.destroy(function (err) {
    res.redirect("/signin");

  });
};