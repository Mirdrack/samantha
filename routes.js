var routes = function (app) {

	app.get('/', function (req, res) {
	
		res.render('index.jade');
	});

	app.get('/fake', function (req, res) {

		res.render('fake.jade');
	});

};

module.exports = routes;