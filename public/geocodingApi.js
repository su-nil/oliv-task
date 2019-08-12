const axios = require('axios');
const config = require('./config');

module.exports = function(app, db) {
	app.get('/geocode/:query', (req, res) => {
		axios
			.get(
				`https://maps.googleapis.com/maps/api/geocode/json?address=${req.params.query}&key=${config.mapsApiKey}`
			)
			.then(function(response) {
				if (response.data.status == 'OK') {
					res.json(response.data.predictions);
				} else {
					res.status(400).send('Error');
				}
			})
			.catch(function(error) {
				res.status(500).send('There was an error!');
			});
	});
};
