import axios from 'axios';
// Can use offset to fetch more results, currently set to 0
const offset = 0;

export default function yelpResults({ lat, lng }) {
	return new Promise((resolve, reject) => {
		axios
			.get(`/yelp/${lat}/${lng}/${offset}`)
			.then((response) => {
				const businesses = response.data.data.search.business.map((el) => {
					const {
						name,
						rating,
						photos,
						location: { formatted_address },
						price,
						review_count,
						coordinates,
						display_phone,
						categories: { title: tags }
					} = el;
					const address = formatted_address.replace(/\n/g, ' ');
					return {
						name,
						rating,
						photos,
						address,
						coordinates,
						price,
						review_count,
						tags
					};
				});
				resolve(businesses);
			})
			.catch((error) => reject(error));
	});
}
