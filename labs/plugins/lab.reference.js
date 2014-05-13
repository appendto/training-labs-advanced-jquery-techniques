(function ( $, lesson ){

  lesson.plugins = {
    exercise_1: function() {
      /*

          Create a plugin called `setupTask` that will select all the tasks and add a checkbox before each task item and hide the text delete button.  Each checkbox should have an event that turns the text gray when selected.

      */

      $.fn.setupTask = function() {

        return this.each(function() {
          $(this)
            .find(".delete")
              .hide()
              .end()
            .append("<input type='checkbox'>")
            .find("input[type='checkbox']")
              .on("click", function(e){
                $(e.currentTarget).closest("li").css("color", "#666666");
              });
        });
      };

    }
  };

})( jQuery, window.lesson = window.lesson || {} );