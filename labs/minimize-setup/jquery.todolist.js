(function ( $ ) {

var TodoList = function ( el ) {
	this.events = $.extend( {}, this.events );
	this.initialize.call( this, el );
};

$.extend( TodoList.prototype, {
	events: {
		"click li .delete": "handleDeleteItem",
		"focusin input": "handleFocus",
		"focusout input": "handleFocus",
		"submit form": "handleFormSubmit",
		"itemadded": "handleItemCount",
		"itemremoved": "handleItemCount"
	},
	initialize: function ( el ) {
		this.$el = $( el );

		this.setupEvents();

		if ( typeof window.lesson !== "undefined" && lesson.minimizeSetup ) {
			lesson.minimizeSetup.exercise_2( this.$el );
			lesson.minimizeSetup.exercise_3( this.$el );
		}
	},

	setupEvents: function () {
		var $el = this.$el;
		var self = this;
		$.each( this.events, function ( eventpath, callback ) {
			var parts = eventpath.split( " " );
			var evt = parts.shift();
			if ( parts.length ) {
				$el.on( evt, parts.join( " " ), $.proxy( self[ callback ], self ));
			} else {
				$el.on( evt, $.proxy( self[ callback ], self ));
			}
		});
	},

	handleDeleteItem: function ( e ) {
		var $el = $( e.currentTarget );
		var $ul = $el.closest( "ul" );
		$el.closest( "li" ).remove();
		$ul.trigger( "itemremoved" );
	},

	handleFocus: function ( e ) {
		$( e.currentTarget ).toggleClass( "focus", e.type === "focusin" );
	},

	handleFormSubmit: function ( e ) {
		e.preventDefault();

		var component = this.$el;
		var todo = component.find( "input:first" );
		var text = todo.val();

		if ( !text ) {
			return;
		}
		
		component.find( "ul" )
			.append( "<li>" + text + " <span class='delete'>[X]</span></li>")
			.trigger( "itemadded" );

		todo.val( "" ).focus();
	},

	handleItemCount: function ( e ) {
		this.$el.find( ".count" ).text( this.$el.find( "ul li" ).length );
	}
});


$.fn.todoList = function () {
	return this.each( function ( i, el ) {
		var todoList = new TodoList( el );
		$.fn.todoList.instances++;
		$.data( el, "todolist", todoList );
	});
};

$.fn.todoList.instances = 0;

}( jQuery ));