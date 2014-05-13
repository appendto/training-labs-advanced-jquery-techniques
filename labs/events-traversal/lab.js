(function ( $, lesson ){

lesson.eventsTraversal = {

	exercise_0: function () {
		// This is an example exercise. Use addClass to add "sample"
		// to the HTML element





	},

	exercise_1: function () {
		// When the the .delete span is clicked, it should remove
		// the parent li from the list. Use a single delegated event to accomplish this.
		// After removing this item, trigger a custom "itemremoved" event on the `ul`






	},

	exercise_2: function () {
		// When the text box gains/loses focus, it should add/remove a "focus" class.
		// Use delegated events to accomplish this	






	},

	exercise_3: function () {
		// When the form is submitted, use the contents of the input to create a new todo
		// If the contents are blank, nothing should happen
		// After adding the item, trigger a custom event "itemadded" on the `ul`
		// After adding the item, clear out the field and focus back on the field.






	},

	exercise_4: function () {
		// Listen for the "itemadded/itemremoved" events on .todo-list
		// and update the item count






	},

	exercise_5: function () {
		// Return a function that could be used as a custom filter callback
		// It should test the text content of the element to see if it contains
		// the word "Event"






		
	}
};

}( jQuery, window.lesson = window.lesson || {} ));
