// Create a module
var cryptApp = angular.module('cryptApp', ['ngResource', 'ngRoute']);

// Route provider to control what controllers / views are used at a specific route
cryptApp.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl : '/templates/cryptanimallist',
			controller  : 'cryptAnimalList'
		})

});

// AnimalFactory creation
cryptApp.factory('animalFactory', function($resource){

	// This creates a $resource model
	// Our base URL is /api/animals with the option of additionally passing the /:id component
	// All the methods this $resource model uses will be in reference to those URLs
	var model = $resource('/api/animals/:id', {id : '@_id'})
	// this._id
	// @_id

	// model.query() // GET - /api/animals
	// model.get()
	// model.$save() // POST - /api/animals
	// model.$delete()
	// model.get({id : ObjectId('5483292394823')}) // GET - /api/animals/5483292394823

	// Factories use the revealing module pattern, so we must return the relevant pieces of information
	return {
		model   : model,
		animals : model.query() // GET - /api/animals  Should get all the animals in our DB
	}


});

// cryptAnimalList Controller - we are injected animalFactory into it!
cryptApp.controller('cryptAnimalList', function($scope, animalFactory){
	console.log('I AM THE CONTROLLER', animalFactory);

	// List of all of our animals returned from animalFactory.animals
	$scope.animals = animalFactory.animals;

	// AddAnimal function being called on a submit event in our template's form
	$scope.addAnimal = function(){
		// console.log(this.newAnimal);

		// Create a new instance of our $resource model to attach methods
		// These methods include things like $save, $delete, get, etc
		var newCryptAnimal = new animalFactory.model(this.newAnimal);

		// Want to initiate the $save method
		// This POSTS to /api/animals which will use the newCryptAnimal data to create a new database document
		newCryptAnimal.$save(function(returnData){
			// console.log('return', returnData)

			// After we receive the saved document from the server, we will push it into our list of animals
			// This allows the front-end to update immediately
			animalFactory.animals.push(returnData);
		});

		// Our form inputs are modeling this object, by setting it back to an empty object, 
		// we reset the values of all the forms (and the value of the newAnimal object)
		this.newAnimal = {};

	}

});
