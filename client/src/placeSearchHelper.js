import axios from 'axios';

export default async function placeSearch(query) {
	return new Promise((resolve, reject) => {
		axios
			.get(`http://localhost:8000/search/${query}`)
			.then((response) => {
				const place = response.data;
				resolve(place[0]);
			})
			.catch((error) => reject(error));
	});
}
