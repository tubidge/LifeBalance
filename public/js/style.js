// $(document).ready(function () {
//   M.AutoInit();
//   selectOnLoad();

//   $(document).on("click", ".sidenav-trigger", limitCategory);
//   $(document).on("change", ".category-checkbox", limitCategory);
//   $(document).on("submit", ".category-form", updateCategory);
//   $(document).on("dblclick", ".todo-item", editTodo);
//   $(document).on("blur", ".todo-item", cancelEdit);
//   $(document).on("click", ".new-task-btn", promptNew);
//   $(document).on("blur", ".new-task", cancelNew);
//   $(document).on("click", ".view-completed", viewCompleted);

//   // ===== Selection Code =====
//   function selectOnLoad() {
//     $(".category-title").each(function () {
//       var value = $(this).text();
//       var active = $("input[type=checkbox][value=" + value + "]");

//       active.attr("checked", "checked");

//     });
//   }

//   // ***This isn't the best way to do this. Update after seeking advice***
//   /**
//    * If there is a way to update only the changed items on submit that would be ideal. 
//    * As it is I can only think how to update all selections or one at a time
//    */
//   function updateCategory() {
//     var data = {};

//     $(".category-checkbox").each(function () {

//       data.id = $(this).children("input").attr("name");
//       data.active = $(this).children("input").prop("checked");

//       $.ajax({
//         url: "/api/selection/:id",
//         method: "PUT",
//         data: data
//       }).then(function () {
//         console.log("Updated active status");
//         location.reload();
//       });
//     });
//   }

//   function limitCategory() {
//     var count = $(".category-checkbox input:checkbox:checked").length;
//     var input = $(".category-checkbox input[type=checkbox]");

//     if (count >= 3) {

//       input.each(function () {
//         var selected = $(this).prop("checked");
//         if (!selected) {
//           $(this).prop("disabled", true);
//         }
//       });

//     } else {
//       input.prop("disabled", false);
//     }
//   }

//   // ===== Task Code =====

//   // This function handles showing the input box for a user to edit a todo
//   function editTodo() {
//     // var currentTodo = $(this).data("id");
//     var text = $(this).children("lable").text();

//     $(this).children().hide();
//     $(this).children("input.edit").val(text);
//     $(this).children("input.edit").show();
//     $(this).children("input.edit").focus();
//     $(this).closest("li").addClass("edit-input");
//   }


//   // This function is called whenever a todo item is in edit mode and loses focus
//   // This cancels any edits being made
//   function cancelEdit() {
//     var currentTodo = $(this).data("id");
//     if (currentTodo) {
//       $(this).children().hide();
//       $(this).children("input.edit").val(currentTodo.text);
//       $(this).children("lable").show();
//       $(this).children("input[type='checkbox']").show();
//     }
//     $(this).closest("li").removeClass("edit-input");
//   }


//   function promptNew() {
//     var input = $(".add-todo-item").children("input[type=text]");
//     var section = $(this).closest("section");
//     section.addClass("new");

//     $(".new .add-todo-item").show();

//     input.focus();
//     section.removeClass("new");
//   }

//   function cancelNew() {
//     $(".add-todo-item").hide();
//     $(".new-task").val("");
//   }

//   // ===== Completed Task Code =====

//   function viewCompleted() {

//     $(this).children("span").toggle();
//     $(this).siblings(".completed-list").slideToggle();

//   }
// });

//   // // This function handles showing the input box for a user to edit a todo
//   // function editTodo() {
//   //   // var currentTodo = $(this).data("id");
//   //   var text = $(this).children("lable").text();

//   //   $(this).children().hide();
//   //   $(this).children("input.edit").val(text);
//   //   $(this).children("input.edit").show();
//   //   $(this).children("input.edit").focus();
//   //   $(this).closest("li").addClass("edit-input");
//   // }

//   // // This function is called whenever a todo item is in edit mode and loses focus
//   // // This cancels any edits being made
//   // function cancelEdit() {
//   //   var currentTodo = $(this).data("id");
//   //   if (currentTodo) {
//   //     $(this).children().hide();
//   //     $(this).children("input.edit").val(currentTodo.text);
//   //     $(this).children("lable").show();
//   //     $(this).children("input[type='checkbox']").show();
//   //   }
//   //   $(this).closest("li").removeClass("edit-input");
//   // }

//   // function promptNew() {
//   //   var input = $(".add-todo-item").children("input[type=text]");
//   //   var section = $(this).closest("section");
//   //   section.addClass("new");

//   //   $(".new .add-todo-item").show();

//   //   input.focus();
//   //   section.removeClass("new");
//   // }

//   // function cancelNew() {
//   //   $(".add-todo-item").hide();
//   //   $(".new-task").val("");
//   // }


// // });