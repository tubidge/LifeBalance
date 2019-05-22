/**
 * =====FORMS=====
 * #signup - on submit
 * #login - on submit
 * #new-task - on submit
 */

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

// $.ajax("/", {
//   type: "GET"
// }).then(
//   function () {
//     console.log("workd");
//     location.reload();
//   }
// );