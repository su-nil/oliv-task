// TODO Better error reporting by checking the JSON content
const axios = require('axios');
const limit = 20;

module.exports = function(app, db) {
	app.get('/yelp/:lat/:lng/:offset', (req, res) => {
		axios({
			url: 'https://api.yelp.com/v3/graphql',
			method: 'post',
			data: {
				query: `
			    {
			        search(term:"restaurants" latitude: ${req.params.lat} longitude: ${req.params.lng}
			                limit:${limit} offset:${req.params.offset}){
			            total
			            business {
			                name
							url
							review_count
			                coordinates{
			                    latitude
			                    longitude
							}
							location {
								formatted_address
							}
							categories {
								title
							}
							display_phone
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
				console.log(result);
				res.json(result.data);
			})
			.catch((error) => {
				console.log(error);

				res.status(500).send('There was an error!');
			});
	});
};
