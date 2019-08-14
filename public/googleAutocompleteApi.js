const axios = require('axios');

module.exports = function(app, db) {
	app.get('/autocomplete/:query', (req, res) => {
		axios
			.get(
				`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req.params.query}&key=${process
					.env.MAPS_API_KEY}`
			)
			.then((response) => {
				if (response.data.status == 'OK') {
					res.json(response.data.predictions);
				} else {
					res.status(400).send('Error');
				}
			})
			.catch((error) => {
				res.status(500).send('There was an error!');
			});
	});
};
