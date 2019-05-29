/**
 * =====FORMS=====
 * #signup - on submit (done?)
 * #login - on submit
 * #new-task - on submit (done?)
 */

$(document).ready(function () {
  M.AutoInit();
  selectOnLoad();

  $(document).on("click", ".sidenav-trigger", limitCategory);
  $(document).on("change", ".category-checkbox", limitCategory);
  $(document).on("submit", ".category-form", updateCategory);
  $(document).on("dblclick", ".todo-item", editTodo);
  $(document).on("keyup", ".todo-item", finishEdit);
  $(document).on("blur", ".todo-item", cancelEdit);
  $(document).on("click", ".todo-item", completeTodo);
  $(document).on("click", ".new-task-btn", promptNew);
  $(document).on("blur", ".new-task", cancelNew);


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
        SelectionId: $(this).data("category"),
        UserId: 1
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
          status: checked
        }
      }).then(function () {
        console.log("Task completed.");
        // location.reload();
      });
    }
  }


  /**
   * === we will need these post routes ===
   * get "/signup" - for the "signup" page
   * get "/login" - for the "login" page
   */


});
