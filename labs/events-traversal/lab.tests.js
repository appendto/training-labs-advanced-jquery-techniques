module( "Events and Traversal", {
	setup: function() {

	},
	teardown: function() {

	}
});

var _reset = function () {
	$( document ).off();
	$( document.body ).off();
};

test( "Exercise 0: Add `sample` class to HTML element", function () {
	var html = $( "html" );
	ok( !html.hasClass( "sample" ), "Should not have sample class to start" );
	lesson.eventsTraversal.exercise_0();
	ok( html.hasClass( "sample" ), "Should not have sample class to start" );
});

test( "Exercise 1: Clicking on delete should remove an item", function() {
	_reset();
	var list =  $( ".todo-list" );
	var evtFired = false;
	$( "ul" ).on( "itemremoved", function () {
		evtFired = true;
	});

	var _closest = $.fn.closest;
	var closestCount = 0;
	$.fn.closest = function () {
		closestCount++;
		return _closest.apply( this, arguments );
	};


	lesson.eventsTraversal.exercise_1();

	equal( list.find( "li" ).length, 2, "There should be two starting items" );

	list.find( "li:eq(1) .delete" ).click();

	equal( list.find( "li" ).length, 1, "One item should have been removed when delete was clicked" );

	var levels = 0;
	var start = list.find( "li:eq(0) .delete" );
	var data;

	while( !start[0] !== document ) {
		data = $._data( start[ 0 ] );
		if ( data.events && data.events.click ) {
			break;
		} else {
			levels++;
			start = start.parent();
		}
	};

	ok( levels > 1, "Event should be delegated on the ul or above" );
	ok( evtFired, "You should publish a itemremoved event" );
	equal( closestCount, 2, "You should have used closest twice. Once for the ul, once for the li" );

	$.fn.closest = _closest;
});

test( "Exercise 2: The input should gain/lose a class when it gains/loses focus", function() {
	_reset();

	var input =  $( "input[type=text]" );
	var submit =  $( "input[type=submit]" );

	ok( !input.hasClass( "focus" ), "It starts without the class" );

	lesson.eventsTraversal.exercise_2();

	input.focus();

	ok( input.hasClass( "focus" ), "The input should have the class focus when focused." );

	input.blur();

	ok( !input.hasClass( "focus" ), "The input should not have the class focus when it no longer has focus." );

	submit.focus();

	ok( !submit.hasClass( "focus" ), "The submit should NOT have the class focus when focused." );
});

test( "Exercise 3: Add a new item when the form is submitted", function () {
	_reset();

	var form = $( "form" ).off();
	var evtFired = false;
	$( "ul" ).on( "itemadded", function () {
		evtFired = true;
	});

	var defaultPrevented = null;

	$( document ).on( "submit", function ( e ) {
		defaultPrevented = e.isDefaultPrevented();
		e.preventDefault();
	});

	var evt = $.Event( "submit" );

	lesson.eventsTraversal.exercise_2();
	lesson.eventsTraversal.exercise_3();

	form.trigger( evt );

	ok( defaultPrevented, "You must prevent default in order to keep the form from submitting." );
	

	var list =  $( ".todo-list" );

	equal( list.find( "li" ).length, 2, "If the field is empty, don't add a line" );

	form.find( "input:text" ).val( "Hello" );

	form.trigger( "submit" );

	equal( list.find( "li" ).length, 3, "There should be three items" );

	ok( list.find( "li:eq(2)" ).html().indexOf( "Hello" ) > -1, "New item should contain the proper text" );
	ok( list.find( "li:eq(2)" ).html().indexOf( "delete" ) > -1, "New item should contain a delete link" );

	ok( $( "input[type=text]" ).hasClass( "focus" ), "The input should have the class focus after the todo is added." );

	ok( evtFired, "You should publish a itemadded event" );
});

test( "Exercise 4: Handle itemadded and itemremoved events", function () {
	_reset();
	var count = $( ".count" );

	equal( count.text(), "2", "Count should be 2 to start" );

	lesson.eventsTraversal.exercise_4();

	$( "ul" ).append( "<li></li>" ).trigger( "itemadded" );

	equal( count.text(), "3", "Count should be 3 after an item is added" );

	$( "ul" ).empty().trigger( "itemremoved" );

	equal( count.text(), "0", "Count should be 9 after all items are removed" );

});

test( "Exercise 5: build a custom filter that tests for the word Event", function () {
	var callback = lesson.eventsTraversal.exercise_5();


	equal( $( ".todo-list li" ).filter( callback ).length, 1, "It should only find one li element" );
});