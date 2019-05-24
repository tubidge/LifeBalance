$(document).ready(function () {
  M.AutoInit();

  $(document).on("dblclick", ".todo-item", editTodo);
  // $(document).on("keyup", ".todo-item", finishEdit);
  $(document).on("blur", ".todo-item", cancelEdit);
  // $(document).on("click", ".todo-item", completeTodo);
  $(document).on("click", ".category-title", promptOptions);
  // $(document).on("change", ".cat-options", selectCat);
  $(document).on("blur", ".cat-options", cancelCatEdit);
  $(document).on("click", ".new-task-btn", promptNew);
  $(document).on("focusout", ".new-task-input", cancelNew);

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

  // >>>>> moved to index.js
  // // This function starts updating a todo in the database if a user hits the "Enter Key"
  // // While in edit mode
  // function finishEdit(event) {
  //   // var updatedTodo = $(this).data("id");
  //   if (event.which === 13) {
  //     var text = $(this).children("input[type='text']").val().trim();
  //     $(this).blur();
  //     // updateTodo(updatedTodo);
  //     $(this).children("lable").text(text);
  //     console.log(text);
  //   }
  //   $(this).closest("li").removeClass("edit-input");
  // }

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

  function promptOptions() {
    $(this).hide();
    $(this).siblings().show();
  }

  // >>>>> moved to index.js
  // function selectCat() {
  //   var selected = $(".cat-options option:selected").val();
  //   $(this).siblings("h5").text(selected);

  //   $(this).hide();
  //   $(this).siblings().show();
  // }

  function cancelCatEdit() {
    $(this).hide();
    $(this).siblings().show();
  }

  // >>>>> moved to index.js
  // function completeTodo() {
  //   // var currentTodo = $(this).data("id");
  //   var checked = $(this).children("input[type=checkbox]").prop("checked");
  //   if (checked) {
  //     $(this).fadeOut("slow");
  //   }
  // }

  function promptNew() {
    var input = $(".add-todo-item").children("input[type=text]");

    $(".add-todo-item").show();
    input.focus();
  }

  function cancelNew() {
    $(".add-todo-item").hide();
    $(".new-task").val("");
  }

});