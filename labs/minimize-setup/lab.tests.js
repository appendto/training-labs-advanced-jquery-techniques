module( "Minimizing Setup", {
	setup: function() {
		_reset();
	},
	teardown: function() {

	}
});

var _reset = function () {
	$.fn.todoList.instances = 0;
};

test( "Exercise 1: Use a beacon even and one time initialization pattern to initialize the todo list", function () {
	var todoList = $( ".todo-list:first" );

	equal( $.fn.todoList.instances, 0, "There should be no instances yet." );

	lesson.minimizeSetup.exercise_1();

	todoList.find( "input:first" ).focus().trigger( "keydown" ).trigger( "keyup" ).trigger( "keypress" );

	ok( !!todoList.data( "todolist" ), "The todoList should be setup on the element the input has been focused or the user has started to type.");
	equal( $.fn.todoList.instances, 1, "Expected there to only be one instance" );
});

test( "Exercise 2: Handle initial state of clear buttons as well as dynamic state", function () {

	equal( $.fn.todoList.instances, 0, "There should be no instances yet." );

	var todoList = $( ".todo-list:first" );

	todoList.todoList();

	var clearButton = todoList.find( ".clear-list" );
	var input = todoList.find( "input:first" );
	var form = todoList.find( "form" );

	// Safety if the user broke something
	form.on( "submit", function ( e ) { e.preventDefault(); });

	ok( !clearButton.is( ":visible" ), "Clear button should not yet be visible" );

	input.val( "New item" );
	form.submit();

	ok( clearButton.is( ":visible" ), "Clear button should be visible since there are items in the list" );

});

test( "Exercise 3: Handle clearing the list when the clear button is clicked", function () {

	var todoList = $( ".todo-list:eq(1)" );

	todoList.addClass( "setup" );

	todoList.todoList();

	var clearButton = todoList.find( ".clear-list" );
	var input = todoList.find( "input:first" );
	var form = todoList.find( "form" );

	input.val( "New item" );
	form.submit();

	input.val( "Second item" );
	form.submit();

	var fired = 0;

	todoList.on( "itemremoved", function ( e ) {
		fired++;
	});

	clearButton.click();


	equal( todoList.find( "li" ).length, 0, "Expected all list items to be removed" );
	ok( !!fired, "itemremoved was triggered at least once" );
	equal( fired, 1, "itemremoved was fired only once" );
});