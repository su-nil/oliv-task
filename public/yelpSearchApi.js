// TODO Better error reporting by checking the JSON content
const axios = require('axios');
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
				Authorization: `Bearer ${process.env.YELP_API_KEY}`,
				'Content-Type': 'application/json'
			}
		})
			.then((result) => {
				res.json(result.data);
			})
			.catch((error) => {
				res.status(500).send('There was an error!');
			});
	});
};
