// TODO try catch

import axios from 'axios';

export default async function placeSearch(query) {
	const results = await axios.get(`http://localhost:8000/autocomplete/${query}`).then((response) => response.data);
	const placeArray = results.map((res) => res.description);
	return placeArray;
}
