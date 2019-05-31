$(document).ready(function () {
  M.AutoInit();
  selectOnLoad();
  colorChange();

  $(document).on("click", ".sidenav-trigger", limitCategory);
  $(document).on("change", ".category-checkbox", limitCategory);
  $(document).on("submit", ".category-form", updateCategory);
  $(document).on("dblclick", ".todo-item", editTodo);
  $(document).on("keyup", ".todo-item", finishEdit);
  $(document).on("blur", ".todo-item", cancelEdit);
  $(document).on("click", ".todo-item", completeTodo);
  $(document).on("click", ".new-task-btn", promptNew);
  $(document).on("blur", ".new-task", cancelNew);
  $(document).on("click", ".view-completed", viewCompleted);


  // ===== Selection Code =====
  function selectOnLoad() {

    $(".category-title").each(function () {
      var value = $(this).text();
      var active = $("input[type=checkbox][value=" + value + "]");
      active.attr("checked", "checked");

    });
  }

  // ***This isn't the best way to do this. Update after seeking advice***
  /**
   * If there is a way to update only the changed items on submit that would be ideal. 
   * As it is I can only think how to update all selections or one at a time
   */
  function updateCategory() {
    var data = {};

    $(".category-checkbox").each(function () {

      data.id = $(this).children("input").attr("name");
      data.active = $(this).children("input").prop("checked");

      $.ajax({
        url: "/api/selection/:id",
        method: "PUT",
        data: data
      }).then(function () {
        console.log("Updated active status");
        location.reload();
      });
    });
  }

  function limitCategory() {
    var count = $(".category-checkbox input:checkbox:checked").length;
    var input = $(".category-checkbox input[type=checkbox]");

    if (count >= 3) {

      input.each(function () {
        var selected = $(this).prop("checked");
        if (!selected) {
          $(this).prop("disabled", true);
        }
      });

    } else {
      input.prop("disabled", false);
    }
  }

  // jQuery for signup page
  $("#signup-form").on("submit", function (event) {
    event.preventDefault();

    var newUser = {
      User: $("input[name='username']").val().trim(),
      password: $("input[name='password']").val().trim()
    };

    console.log(newUser);
    // making ajax call with new user data
    $.ajax({
      url: "/signup",
      method: "POST",
      data: newUser
    }).then(function () {
      console.log("Added new user");
    });
  });

  // jQuery for new task
  $(".new-task").keydown(function (event) {
    if (event.which === 13) {
      event.preventDefault();
      $(".new-task").submit();
      var data = {
        task: $(this).val().trim(),
        SelectionId: $(this).data("category")
      };
      // making ajax request with new task data
      $.ajax({
        url: "/api/todos",
        method: "POST",
        data: data
      }).then(function () {
        console.log("Added new task");
        $(".new-task").val("");

        location.reload();
      });
    }
  });

  // This function handles showing the input box for a user to edit a todo
  function editTodo() {
    // var currentTodo = $(this).data("id");
    var text = $(this).children("lable").text();

    $(this).children().hide();
    $(this).children("input.edit").val(text);
    $(this).children("input.edit").show();
    $(this).children("input.edit").focus();
    $(this).closest("li").addClass("edit-input");
  }

  // This function starts updating a todo in the database if a user hits the "Enter Key"
  // While in edit mode
  function finishEdit(event) {
    var updatedTodo = $(this).data("id");

    if (event.which === 13) {
      var text = $(this).children("input[type='text']").val().trim();
      $(this).blur();
      // updateTodo(updatedTodo);
      $(this).children("lable").text(text);
      console.log(updatedTodo);
      console.log(text);
      $.ajax({
        url: ("/api/todos/:id"),
        method: "PUT",
        data: {
          id: updatedTodo,
          task: text
        }
      }).then(function () {
        console.log("Task updated.");
        location.reload();
      });
    }

    $(this).closest("li").removeClass("edit-input");
  }

  // This function is called whenever a todo item is in edit mode and loses focus
  // This cancels any edits being made
  function cancelEdit() {
    var currentTodo = $(this).data("id");
    if (currentTodo) {
      $(this).children().hide();
      $(this).children("input.edit").val(currentTodo.text);
      $(this).children("lable").show();
      $(this).children("input[type='checkbox']").show();
    }
    $(this).closest("li").removeClass("edit-input");
  }

  function promptNew() {
    var input = $(".add-todo-item").children("input[type=text]");
    var section = $(this).closest("section");
    section.addClass("new");

    $(".new .add-todo-item").show();

    input.focus();
    section.removeClass("new");
  }

  function cancelNew() {
    $(".add-todo-item").hide();
    $(".new-task").val("");
  }

  function completeTodo() {
    var currentTodo = $(this).data("id");
    var checked = $(this).children("input[type=checkbox]").prop("checked");
    if (checked) {
      $(this).fadeOut("slow");
      $.ajax({
        url: "/api/todos/complete/:id",
        method: "PUT",
        data: {
          id: currentTodo,
          completed: checked
        }
      }).then(function () {
        console.log("Task completed.");
        console.log(currentTodo, checked);
        // location.reload();
        colorChange();
      });
    }
  }

  // ===== Completed Task Code =====

  function viewCompleted() {

    $(this).children("span").toggle();
    $(this).siblings(".completed-list").slideToggle();

  }




  function bubbleSort(countArray) {
    var swapp;
    var n = countArray.length - 1;
    var x = countArray;
    do {
      swapp = false;
      for (var i = 0; i < n; i++) {
        if (x[i].count > x[i + 1].count) {
          var temp = x[i];
          x[i] = x[i + 1];
          x[i + 1] = temp;
          swapp = true;
        }
      }
      n--;
    } while (swapp);
    return x;
  }

  //turns map into an array of objects
  function formatCountMap(countMap) {
    var formatted = [];
    for (var key in countMap) {
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
    colorMap[sortedCategories[0].name] = "#80ab49"; //green

    // check all middle categories
    for (var i = 1; i < sortedCategories.length - 1; i++) {
      var categoryObject = sortedCategories[i];
      //if task count in middle is equal to first count then its green
      if (categoryObject.count === sortedCategories[0].count) {
        colorMap[categoryObject.name] = "#80ab49"; //green
      } else {
        //if not equal then its yellow
        colorMap[categoryObject.name] = "#fe8501"; //orange
      }
    }
    // set last category
    var lastCategory = sortedCategories[sortedCategories.length - 1].name;
    //if the first and last = in count then its green else its red
    if (sortedCategories[0].count === sortedCategories[sortedCategories.length - 1].count) {
      colorMap[lastCategory] = "#80ab49"; //green
    } else {
      colorMap[lastCategory] = "#f11f24"; //red
    }
    return colorMap;
  }

  function createCountMap(tasks) {
    var countMap = {};
    // count_map = { "home": 10, "work": 1, "school": 5 }
    tasks.each(function (index) {
      var task = $(tasks[index]);
      var category = task.attr("data-category");

      if (!category) { return; } // skip if category is bad

      //if this is a task at a selected category then add one to count(adds to existing count)
      if (countMap[category]) {
        countMap[category]++;
        //if this category does not have a count yet, set it to one(starts out at 1)
      } else {
        countMap[category] = 1;
      }
    });
    return countMap;
  }

  function generateRankMap(data) {
    // count the number per category
    var countMap = createCountMap(data);
    // format the count map to be a list so you can sort it easier
    var formatted = formatCountMap(countMap);
    // sort count map by count and insert sorted into sorted categories
    var sortedCategories = bubbleSort(formatted);
    // create a color map based on the sorted categories
    return generateColorMap(sortedCategories);
  }

  function colorChange() {
    // find all tasks
    var tasks = $(".todo-item");
    // pass them into generate rank map
    var rankMap = generateRankMap(tasks);
    // use rank map to set backgroud style on category-headers
    var categoryHeaders = $(".collection-header");
    // added button class
    var newTaskBtn = $(".new-task-btn");

    categoryHeaders.each(function (index) {
      var header = $(categoryHeaders[index]);
      var btn = $(newTaskBtn[index]);
      var category = header.attr("data-category");
      var color = rankMap[category];
      header.css("background-color", color);
      btn.css("background-color", color);
    });
  }


});
