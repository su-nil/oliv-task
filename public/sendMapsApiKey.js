const config = require('./config');

module.exports = function(app, db) {
	app.get('/getapikey', (req, res) => {
		res.json({ mapsApiKey: config.mapsApiKey });
	});
};
