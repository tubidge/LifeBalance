$(document).ready(function () {
  M.AutoInit();
  selectOnLoad();

  $(document).on("change", ".category-checkbox", updateCategory);
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

  }

    // ===== Task Code =====

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
    // var updatedTodo = $(this).data("id");
    if (event.which === 13) {
      var text = $(this).children("input[type='text']").val().trim();
      $(this).blur();
      // updateTodo(updatedTodo);
      $(this).children("lable").text(text);
      console.log(text);
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

  function completeTodo() {
    // var currentTodo = $(this).data("id");
    var checked = $(this).children("input[type=checkbox]").prop("checked");
    if (checked) {
      $(this).fadeOut("slow");
    }
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


});