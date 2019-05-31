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
        if (countMap.hasOwnProperty(key)) {
            formatted.push({ 
                name: key,
                count: countMap[key]
            });
        }
    } return formatted;
}

function generateColorMap(sortedCategories) {
    var colorMap = {};
    //color map        
    // set first category
    //first count is always green
    colorMap[sortedCategories[0].name] = "green";

    // check all middle categories
    for(var i = 1; i < sortedCategories.length-1; i++) {
        var categoryObject = sortedCategories[i];
        //if task count in middle is equal to first count then its green
        if(categoryObject.count === sortedCategories[0].count) {
            colorMap[categoryObject.name] = "green";
        } else {
            //if not equal then its yellow
            colorMap[categoryObject.name] = "gold";
        }
    }
    // set last category
    var lastCategory = sortedCategories[sortedCategories.length-1].name;
    //if the first and last = in count then its green else its red
    if(sortedCategories[0].count === sortedCategories[sortedCategories.length-1].count){
        colorMap[lastCategory] = "green";
    } else{
        colorMap[lastCategory] = "red";
    }
    return colorMap;
}

function createCountMap(tasks) {
    var countMap = {};
    // count_map = { "home": 10, "work": 1, "school": 5 }
    tasks.each(function(index) {
        var task = $(tasks[index]);
        var category = task.attr("data-category");

        if(!category) { return; } // skip if category is bad

        //if this is a task at a selected category then add one to count(adds to existing count)
        if(countMap[category]) {
            countMap[category]++;
        //if this category does not have a count yet, set it to one(starts out at 1)
        } else {
            countMap[category] = 1;
        }
    });
    return countMap;
}

function generateRankMap(data){
    // count the number per category
    var countMap = createCountMap(data);
    // format the count map to be a list so you can sort it easier
    var formatted = formatCountMap(countMap);
    // sort count map by count and insert sorted into sorted categories
    var sortedCategories = bubbleSort(formatted);
    // create a color map based on the sorted categories
    return generateColorMap(sortedCategories);
}
  
$(document).ready(function(){
    // find all tasks
    var tasks = $(".todo-item");
    // pass them into generate rank map
    var rankMap = generateRankMap(tasks);
    // use rank map to set backgroud style on category-headers
    var categoryHeaders = $(".collection-header");
    categoryHeaders.each(function(index){
        var header = $(categoryHeaders[index]);
        var category = header.attr("data-category");
        var color = rankMap[category];
        header.css("background-color", color);
    });
});  