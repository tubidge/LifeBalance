var db = require("../models");

function bubbleSort(countArray){
    var swapp;
    var n = countArray.length-1;
    var x=countArray;
    do {
        swapp = false;
        for (var i=0; i < n; i++){
            if (x[i].count < x[i+1].count)
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


db.Task.findAll({}).then(function (dbExamples) {
    var taskArray = res.json(dbExamples);
    var countMap = {};

    // count_map = { "home": 10, "work": 1, "school": 5 }
    for(var i = 0; i < taskArray.length; i++){
        var task = taskArray[i];
        //if task is not completed then do this shiz below
        if(!task.isDone){
            //if this is a task at a selected category then add one to count(adds to existing count)
            if(countMap[task.category]){
                countMap[task.category]++;
            //if there is no category counted set count 1(starts count)
            } else{
                countMap[task.category] = 1;
            }
        }
    }


    var formatted = formatCountMap(countMap);
    // sort count map by count and insert sorted into sorted categories
    var sortedCategories = bubbleSort(formatted);

    var colorMap = {};
    //color map        
    colorMap[sortedCategories[0].name] = "green";

    if(sortedCategories[0].count === sortedCategories[1].count){
        colorMap[sortedCategories[1].name] = "green";
        if(sortedCategories[0].count === sortedCategories[2].count){
            colorMap[sortedCategories[2].name] = "green";
        } else{
            colorMap[sortedCategories[2].name] = "red";
        }
    } else{
        colorMap[sortedCategories[1].name] = "yellow";
    }

});
