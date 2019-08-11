const axios = require('axios');
const YELP_API_KEY =
	'wfjGJjybjdhG0J0LVynQTGytYSx3wWFq86tLagik1Q4VuQNV_RsSMldrz3tdjk_0oC30nRp1ba3PsvsXg1s5c7fx3Wcz9_ZgUcczJpRBcbXd2qLv2_TUH6s64KKbXHYx';

module.exports = function(app, db) {
	app.get('/yelp/:query', (req, res) => {
		console.log(req.params.query);
		axios({
			url: 'https://api.yelp.com/v3/graphql',
			method: 'post',
			data: {
				query: `
			    {
			        search(term:"restaurants" location: "${req.params.query}",
			                limit: 10) {
			            total
			            business {
			                name
			                url
			                coordinates{
			                    latitude
			                    longitude
							}
							rating
							price
							photos
			            }
			        }
			    }`
			},

			// query: `
			//     {
			//         search(term:"restaurants "location: "World Trade Center",
			//                 limit: 10) {
			//             total
			//             business {
			//                 name
			//                 url
			//                 coordinates{
			//                     latitude
			//                     longitude
			//                 }
			//             }
			//         }
			//     }`,
			headers: {
				Authorization: `Bearer ${YELP_API_KEY}`,
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

// module.exports = function(app, db) {
// 	app.get('/search/:query', (req, res) => {
// 		axios
// 			.get(
// 				`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.params
// 					.query}&key=${MAPS_API_KEY}`
// 			)
// 			.then(function(response) {
// 				if (response.data.status == 'OK') {
// 					console.dir(response.data.results);
// 					res.json(response.data.results);
// 				} else {
// 					res.status(400).send('Error');
// 				}
// 			})
// 			.catch(function(error) {
// 				res.status(500).send('There was an error!');
// 			});
// 	});
// };

// axios({
// 	url: 'https://api.yelp.com/v3/graphql',
// 	method: 'post',
// 	data: {
// 		query: `
//         query PostsForAuthor {
//           author(id: 1) {
//             firstName
//               posts {
//                 title
//                 votes
//               }
//             }
//           }
//         `
// 	}
// }).then((result) => {
// 	console.log(result.data);
// });

// {
//     search(term:"restaurants "location: "World Trade Center",
//             limit: 10) {
//         total
//         business {
//             name
//             url
//             coordinates{
//                 latitude
//                 longitude
//             }
//         }
//     }
// }
