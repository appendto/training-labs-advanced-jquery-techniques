module( "Plugins", {
  setup: function() {

  },
  teardown: function() {

  }
});

test( "Exercise 1", function () {

  expect( 4 );

  lesson.plugins.exercise_1();

  /*

        Create a plugin called `setupTask` that will add a checkbox before each task item and hide the text delete button.  Each checkbox should have an event that turns the text gray (#666666) when selected.

    */

  var $tasks = $(".todo-list li");

  ok( typeof $.fn.setupTask === "function", "Looking for a plugin called setupTask.");

  if (typeof $.fn.setupTask === "function") {
    $tasks.setupTask();

    deepEqual( $tasks.find("input[type='checkbox']").length, $tasks.length, "Looking for checkboxes on each task." );

    equal( $tasks.find(".delete").css("display"), "none", "The textual delete button should not be visible");

    $tasks.eq( 0 ).find("input[type='checkbox']").click()

    equal( $tasks.eq(0).css("color"), "rgb(102, 102, 102)", "A selected task should have the text color gray." );
  }

});

