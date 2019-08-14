// TODO Error reporting, try catch
const axios = require('axios');
const config = require('./config');
const limit = 20;

module.exports = function(app, db) {
	app.get('/yelp/:lat/:lng', (req, res) => {
		axios({
			url: 'https://api.yelp.com/v3/graphql',
			method: 'post',
			data: {
				query: `
			    {
			        search(term:"restaurants" latitude: ${req.params.lat}, longitude: ${req.params.lng},
			                limit:${limit}) {
			            total
			            business {
			                name
			                url
			                coordinates{
			                    latitude
			                    longitude
							}
							location {
								formatted_address
							}
							phone
							rating
							price
							photos
			            }
			        }
			    }`
			},
			headers: {
				Authorization: `Bearer ${config.yelpApiKey}`,
				'Content-Type': 'application/json'
			}
		})
			.then((result) => {
				res.json(result.data);
			})
			.catch(function(error) {
				res.status(500).send('There was an error!');
			});
	});
};
