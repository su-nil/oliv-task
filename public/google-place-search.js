const axios = require('axios');
const MAPS_API_KEY = 'AIzaSyDAQOhuvUriLPgDzVblnSSH7BUj-s2EMSw';

module.exports = function(app, db) {
	app.get('/search/:query', (req, res) => {
		axios
			.get(
				`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req.params
					.query}&key=${MAPS_API_KEY}`
			)
			.then(function(response) {
				if (response.data.status == 'OK') {
					res.send(response.data.result);
				} else {
					res.status(400).send('Error');
				}
			})
			.catch(function(error) {
				res.status(500).send('There was an error!');
			});
	});
};
