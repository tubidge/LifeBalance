var db = require("../models");

module.exports = function (app) {
  // // Get all examples
  // app.get("/api/examples", function (req, res) {
  //   db.Example.findAll({}).then(function (dbExamples) {
  //     res.json(dbExamples);
  //   });
  // });

  // // Create a new example
  // app.post("/api/examples", function (req, res) {
  //   db.Example.create(req.body).then(function (dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  // // Delete an example by id
  // app.delete("/api/examples/:id", function (req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  // =====================================================

  //create a new todo task
  app.post("/api/todos", function (req, res) {
    db.Task.create(req.body).then(function (data) {
      res.json(data);
    });
  }); 

  //update the completion status of the task
  app.put("/api/todos/complete/:id", function (req, res) {
    db.Task.update({
      status: req.body.status
    },{
      where: { id: req.params.id }
    }).then(function(data){
      res.json(data);
    });
  });
  
  //update the task body
  app.put("/api/todos/:id", function(req, res){
    //update the body of task at id
    db.Task.update({
      task: req.body.task
    },{
      where: { id: req.params.id }
    }).then(function(data){
      res.json(data);
    });
  });


  //delete the task from the list, different from update completion
  app.delete("/api/todos/:id", function (req, res) {
    db.Task.destroy({ where: { id: req.params.id } }).then(function (data) {
      res.json(data);
    });
  });

  // =====================================================

  app.put("/api/selection/:id", function (req, res) {

    db.Selection.update({
      active: req.body.active,

    }, {
        where: {
          id: req.body.id
        }
      }).then(function (result) {
        res.json(result);
        console.log("updated active");

      });
  });

};