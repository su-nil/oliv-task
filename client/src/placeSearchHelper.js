import axios from 'axios';

export default async function placeSearch(query) {
	return new Promise((resolve, reject) => {
		axios
			.get(`/search/${query}`)
			.then((response) => {
				const place = response.data;
				console.log(place[0]);
				resolve(place[0]);
			})
			.catch((error) => reject(error));
	});
}
