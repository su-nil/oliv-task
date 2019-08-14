import axios from 'axios';

export default function yelpResults({ lat, lng }) {
	return new Promise((resolve, reject) => {
		axios
			.get(`/yelp/${lat}/${lng}`)
			.then((response) => {
				const businesses = response.data.data.search.business;
				resolve(businesses);
			})
			.catch((error) => reject(error));
	});
}
