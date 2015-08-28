var indexController = {
	index: function(req, res) {
		res.render('index');
	},
	templates : function(req, res){
		// req.params.templateName
		res.render('templates/' + req.params.templateName);
	}
};

module.exports = indexController;