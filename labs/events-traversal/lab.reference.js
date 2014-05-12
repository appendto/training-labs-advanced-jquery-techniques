(function ( $, lesson ){

lesson.eventsTraversal = {

	exercise_0: function () {
		// This is an example exercise. Use addClass to add "sample"
		// to the HTML element
		$( "html" ).addClass( "sample" );
	},

	exercise_1: function () {
		// When the the .delete span is clicked, it should remove
		// the parent li from the list. Use a single delegated event to accomplish this.
		// After removing this item, trigger a custom "itemremoved" event on the `ul`
		$( document ).on( "click", "li .delete", function () {
			var $el = $( this );
			var $ul = $el.closest( "ul" );
			$el.closest( "li" ).remove();
			$ul.trigger( "itemremoved" );
		});
	},

	exercise_2: function () {
		// When the text box gains/loses focus, it should add/remove a "focus" class.
		// Use delegated events to accomplish this
		$( document ).on( "focusin focusout", "input[type=text]", function ( e ) {
			$( this ).toggleClass( "focus", e.type === "focusin" );
		});	
	},

	exercise_3: function () {
		// When the form is submitted, use the contents of the input to create a new todo
		// If the contents are blank, nothing should happen
		// After adding the item, trigger a custom event "itemadded" on the `ul`
		// After adding the item, clear out the field and focus back on the field.
		$( document ).on( "submit", "form", function ( e ) {
			e.preventDefault();

			var component = $( this ).closest( ".todo-list" );
			var todo = component.find( "input:first" );
			var text = todo.val();

			if ( !text ) {
				return;
			}
			
			component.find( "ul" )
				.append( "<li>" + text + " <span class='delete'>[X]</span></li>")
				.trigger( "itemadded" );

			todo.val( "" ).focus();
		});
	},

	exercise_4: function () {
		// Listen for the "itemadded/itemremoved" events
		// and update the item count
		$( document ).on( "itemadded itemremoved", ".todo-list", function () {
			var $el = $( this );
			$el.find( ".count" ).text( $el.find( "ul li").length );
		});
	},

	exercise_5: function () {
		// Return a function that could be used as a custom filter callback
		// It should test the text content of the element to see if it contains
		// the word "Event"
		return function (i, el) {
			return $( el ).text().indexOf( "Event" ) > -1;
		};
	}
};

}( jQuery, window.lesson = window.lesson || {} ));