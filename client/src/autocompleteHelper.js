import axios from 'axios';

export default async function placeSearch(query) {
	const results = await axios.get(`http://localhost:8000/autocomplete/${query}`).then((response) => {
		console.dir(response.data);
	});
}
