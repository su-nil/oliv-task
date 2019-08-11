import axios from 'axios';

export default async function placeSearch(query) {
	console.log('in place search');
	const results = await axios.get(`http://localhost:8000/search/${query}`).then((response) => {
		return response.data;
	});
	return results;
}
