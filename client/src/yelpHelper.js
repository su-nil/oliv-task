// TODO Try catch and throw error when location doesn't have any business and other errors

import axios from 'axios';

export default async function yelpResults({ lat, lng }) {
	const results = await axios.get(`http://localhost:8000/yelp/${lat}/${lng}`).then((response) => {
		return response;
	});
	return results.data.data.search.business;
}
