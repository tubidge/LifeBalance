/**
 * =====FORMS=====
 * #signup - on submit (done?)
 * #login - on submit
 * #new-task - on submit (done?)
 */

// jQuery for signup page
$("#signup-form").on("submit", function (event) {
  event.preventDefault();
  var newUser = {
    username: $("input[name='username']").val().trim(),
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
$("#new-task").on("submit", function (event) {
  event.preventDefault();
  // making ajax request with new task data
  $.ajax({
    url: "/api/todos",
    method: "POST",
    data: $("input[name='task']").val().trim();
  }).then(function () {
    console.log("Added new task");
  });
});
/**
*
* The forms are set up to use: $("#signup input[name=username-or-whatever]")
* to target the individual inputs.
*
* We'll need an event listener, and object from the form data and an ajax call? Yeah? Is that all we do here?
*/

/**
* === we will need ===
* "/api/todos" to get todos on page load
*/

/**
 * === we will need these post routes ===
 * get "/signup" - for the "signup" page
 * get "/login" - for the "login" page
 */

/**
* .todo-item - on click
*
*  id from data="id"
*  === we will need this put route ===
* "/api/todos" + id
*
*/

/**
* .delete - on click
*
*  id from data="id"
*  === we will need this delete route ===
*  "/api/todos/" + id
*/