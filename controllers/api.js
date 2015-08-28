var CryptAnimal = require('../models/cryptanimals');

var apiController = {

	get : function(req, res){
		// Want to be able to get either ALL animals or just ONE

		// All animals
		CryptAnimal.find({}, function(err, animals){
			res.send(animals)
		});

	},

	create : function(req, res){
		req.body.componentAnimals = req.body.componentAnimals.split(', ');
		// console.log('!!!!!', req.body)
		
		var animal = new CryptAnimal(req.body);
		animal.save(function(err, doc){
			res.send(doc);
		});
	},

	delete : function(req, res){

		CryptAnimal.remove({_id : req.params.id}, function(err, result){
			res.send(result);
		});

	}
}

module.exports = apiController;