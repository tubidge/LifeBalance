var db = require("../models");

var users = [
  { User: "Jim" },
  { User: "Jill" },
  { User: "James" }
];

var categories = [
  { category: "Work" },
  { category: "Home" },
  { category: "Social" }
];

var tasks = [
  {
    task: "one",
    UserId: "1",
    SelectionId: "1"
  },
  {
    task: "two",
    UserId: "1",
    SelectionId: "2"
  },
  {
    task: "three",
    UserId: "1",
    SelectionId: "2"
  },

];

module.exports = function (app) {

  app.post("/seed/sel", function (req, res) {

    categories.forEach(function (item) {
      db.Selection.create(item).then(function (dbExample) {
        console.log(item);

        res.json(dbExample);
      });

    });
  });


  app.post("/seed/tasks", function (req, res) {

    tasks.forEach(function (item) {
      db.Task.create(item).then(function (dbExample) {
        console.log(item);

        res.json(dbExample);
      });

    });
  });


  app.post("/seed/users", function (req, res) {

    users.forEach(function (item) {
      db.User.create(item).then(function (dbExample) {
        console.log(item);

        res.json(dbExample);
      });

    });
  });

};


