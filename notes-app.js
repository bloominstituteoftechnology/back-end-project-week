var classes = [	"color1", "color2", "color3", "color4", "color5", "color6", "color7", "color8", "color9" ];


var app = angular.module('notesApp', []);

app.controller('notesController', function($scope) {

	


	/* Remove a note from notes */
	$scope.removeNote = function(item) {
		
		var index = $scope.notes.indexOf(item);
		$scope.notes.splice(index, 1);
	}


	/* Add a note to notes */
	$scope.note = {};
	$scope.addNote = function() {

		// Fail if the content is empty
		if(!$scope.note.content) {
			return;
		}

		// Make a new note
		var newNote = {};

 		newNote.title = $scope.note.title;
 		newNote.content = $scope.note.content;
 		newNote.class = classes[Math.floor(Math.random()*classes.length)];

 		// Prepend newNote in the notes array
		$scope.notes.unshift(newNote);

		// Reset the values back to empty
		document.getElementById('newtitle').value='';
		document.getElementById('newcontent').value='';
		$scope.note = {};
	};

});



/* Filter for search */
app.filter('searchFor', function() {

	// All filters must return a function whose first parameter is
	// the data that is to be filtered, and the second is an argument
	// that may be passed with a colon (eg. searchFor:searchString)

	return function(arr, searchString) {
		if(!searchString){
			return arr;
		}

		var result = [];

		searchString = searchString.toLowerCase();

		// Using the forEach helper method to loop through the array
		angular.forEach(arr, function(item) {
			if(item.title.toLowerCase().indexOf(searchString) !== -1 ||
			   item.content.toLowerCase().indexOf(searchString) !== -1) {
				result.push(item);
			}
		});

		return result;
	};

});
