import axios from 'axios';
// TODO Try catch and throw error when location doesnt have any business

export default async function yelpResults({ lat, lng }) {
	const results = await axios.get(`http://localhost:8000/yelp/${lat}/${lng}`).then((response) => {
		// console.log(response);
		return response;
	});
	return results.data.data.search.business;
}
