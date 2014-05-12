(function ( $, lesson ){

lesson.minimizeSetup = {

	exercise_1: function () {
		/*
			Using a beacon event AND a one time initialization method,
			setup the todo list as the user interacts with it

			To setup the todo list, call "todoList()" on the jQuery wrapped element
			Ex: $el.todoList() or $( domElement ).todoList()
		*/

		$( document ).on( "focusin", ".todo-list:not(.setup) input", function ( e ) {
			var $input = $( this );

			$input
				.closest( ".todo-list" )
				.todoList()
				.addClass( "setup" );

			$input.trigger( "focusin" );
		});
	},

	exercise_2: function ( $todoListRoot ) {
		/*
			This excercise will be called each time todoList plugin is set up
			Use this method to setup the state handling of the "clear" button 
			
			Initial state should be handled via CSS!
			
			**Desired Functionality:**
			The clear button should only be visible when there are items in the list
			Remember, itemadded/itemremoved events are still triggered when the list is modified
		*/

		$todoListRoot.on( "itemadded itemremoved", function () {
			var count = $todoListRoot.find( "ul li" ).length;
			$todoListRoot.toggleClass( "has-items", !!count );
		});
	},

	exercise_3: function ( $todoListRoot ) {
		/*
			This excercise will be *also* be called each time todoList plugin is set up
			Use this method to setup the clearing the list when the clear button is pressed 

			**Desired Functionality:**
			The clear button should remove all items, and fire a single itemremoved event
		*/

		$todoListRoot.on( "click", ".clear-list", function () {
			$todoListRoot.find( "li" ).remove();
			$todoListRoot.trigger( "itemremoved" );
		});
	}
};


}( jQuery, window.lesson = window.lesson || {} ));