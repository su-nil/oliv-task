import axios from 'axios';
// TODO Try catch

export default async function yelpResults(query) {
	const results = await axios.get(`http://localhost:8000/yelp/${query}`).then((response) => {
		// console.log(response);
		return response;
	});
	return results.data.data.search.business;
}
