$(document).ready(function () {
  M.AutoInit();
  // selectOnLoad();

  $(document).on("dblclick", ".todo-item", editTodo);
  $(document).on("keyup", ".todo-item", finishEdit);
  $(document).on("blur", ".todo-item", cancelEdit);
  $(document).on("click", ".todo-item", completeTodo);
  $(document).on("click", ".category-title", promptOptions);
  // $(document).on("focus", ".cat-options", selectCat);
  $(document).on("blur", ".cat-options", cancelCatEdit);
  $(document).on("click", ".new-task-btn", promptNew);
  $(document).on("blur", ".new-task", cancelNew);

  function selectOnLoad() {

    $("section").each(function () {

      var value = $(this).find(".category-title").text();
      var option = $(this).find(".cat-options option[value=" + value + "]");
      option.attr("selected", "selected");
    });
  }

  var prevSelection;
  var data = {};
  // var prevId = prevSelection.data("category");
  $(".cat-options").on("focus", function () {
    prevSelection = $(this).find("option:selected");

    data.prevId = prevSelection.data("category");

    console.log(this);
    console.log(prevSelection);
    console.log(data);
  }).change(function () {

    console.log(this);

    prevSelection.removeAttr("selected");
    var selected = $(this).find("option:selected");
    selected.attr("selected", "selected");

    data.prevActive = false;
    data.id = selected.data("category");
    data.active = true;

    console.log(data);

    $.ajax({
      url: "/api/selection/:id",
      method: "PUT",
      data: data
    }).then(function () {
      console.log("Updated active status");
      location.reload();
    });

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

  function promptOptions() {
    $(this).hide();
    $(this).siblings().show();
  }

  function selectCat() {
    var selected = $(".cat-options option:selected");
    // selected.attr("selected", "selected");
    // $(this).siblings("h5").text(selected.val());

    $(this).hide();
    $(this).siblings().show();

    // var id = $("option:selected").data("category");
    // var data = {
    //   id: id,
    //   active: true
    // };

    // $.ajax({
    //   url: "/api/selection/:id",
    //   method: "PUT",
    //   data: data
    // }).then(function () {
    //   console.log("Updated selected category and active status");

    // });

  }

  function cancelCatEdit() {
    $(this).hide();
    $(this).siblings().show();
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

    console.log("workd");

    $(".add-todo-item").hide();
    $(".new-task").val("");

  }

});