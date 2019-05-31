var db = require("../models");


function bubbleSort(countArray){
  var swapp;
  var n = countArray.length-1;
  var x=countArray;
  do {
    swapp = false;
    for (var i=0; i < n; i++){
      if (x[i].count > x[i+1].count)
      {
        var temp = x[i];
        x[i] = x[i+1];
        x[i+1] = temp;
        swapp = true;
      }
    }
    n--;
  } while (swapp);
  return x; 
}

//turns map into an array of objects
function formatCountMap(countMap){
  var formatted = [];
  for(var key in countMap){
    formatted.push({ 
      name: key,
      count: countMap[key]
    });
  } return formatted;
}

function generateColorMap(sortedCategories) {
  var colorMap = {};
  //color map        
  // set first category
  colorMap[sortedCategories[0].name] = "green";

  // check all middle categories
  for(var i = 1; i < sortedCategories.length-1; i++) {
    var categoryObject = sortedCategories[i];
    if(categoryObject.count === sortedCategories[0].count) {
      colorMap[categoryObject.name] = "green";
    } else {
      colorMap[sortedCategories[i].name] = "yellow";
    }
  }
  // set last category
  var lastCategory = sortedCategories[sortedCategories.length-1].name;
  if(sortedCategories[0].count === sortedCategories[sortedCategories.length-1].count){
    colorMap[lastCategory] = "green";
  } else{
    colorMap[lastCategory] = "red";
  }console.log("-------------------------------------");
  console.log(colorMap);
  console.log("-------------------------------------");
  return colorMap;
}

function generateRankMap(selections){
  var countMap = {};
  
  // count_map = { "home": 10, "work": 1, "school": 5 }
  for(var i = 0; i < selections.length; i++){
    var category = selections[i].category;
    var tasks = selections[i].dataValues.Tasks;
    if(tasks.length === 0) {
      continue; // skip empty categories
    }
    countMap[category] = 0;
    for(var j = 0; j < tasks.length; j++) {
      var task = tasks[j];
      //if task is not completed then do this shiz below
      if(!task.completed){
        //if this is a task at a selected category then add one to count(adds to existing count)
        countMap[category]++;
      }
    }
  }
  
  var formatted = formatCountMap(countMap);
  // sort count map by count and insert sorted into sorted categories
  var sortedCategories = bubbleSort(formatted);
  
  // create a color map based on the sorted categories
  return generateColorMap(sortedCategories);
}

// dont touch code below here 
module.exports = function (app) {

  // Homepage
  app.get("/", function (req, res) {

    // console.log("log from route");
    // console.log(req.session);

    db.Selection.findAll({
      include: [{
        model: db.Task,
        where: {
          UserId: req.session.passport.user
        },
        required: false
      }]
    }).then(function (dataSelect) {
      // console.log(dataSelect);
      var viewObj = {
        Selection: dataSelect,
        rankMap: generateRankMap(dataSelect)
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