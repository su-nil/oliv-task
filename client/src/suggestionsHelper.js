import axios from 'axios';
const PATH = process.env.SERVER_URL || 'http://localhost:8000';

export default function getSuggestions(query) {
	return new Promise((resolve, reject) => {
		axios
			.get(`${PATH}/autocomplete/${query}`)
			.then((response) => {
				const places = response.data.map((place) => {
					return {
						value: place.description,
						id: place.id
					};
				});
				resolve(places);
			})
			.catch((error) => reject(error));
	});
}
