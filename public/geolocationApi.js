// Not required

const axios = require('axios');
const config = require('./config');

module.exports = function(app, db) {
	app.get('/geolocation', (req, res) => {
		axios
			.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${config.mapsApiKey}`)
			.then(function(response) {
				console.log(response.data);
				console.log(response.status);

				if (response.status == 200) {
					res.json(response.data);
				} else {
					res.status(400).send('Error');
				}
			})
			.catch(function(error) {
				res.status(500).send('There was an error!');
			});
	});
};
