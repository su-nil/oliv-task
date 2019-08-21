import axios from 'axios';

export default function placeSearch(query) {
	return new Promise((resolve, reject) => {
		axios
			.get(`/search/${query}`)
			.then((response) => {
				const place = response.data;
				resolve(place[0]);
			})
			.catch((error) => reject(error));
	});
}
