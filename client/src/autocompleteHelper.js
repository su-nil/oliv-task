import axios from 'axios';
const MAPS_API_KEY = 'AIzaSyDAQOhuvUriLPgDzVblnSSH7BUj-s2EMSw';

export default async function autocomplete(query) {
	const URL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${MAPS_API_KEY}`;
	const results = await axios.get(URL);
	console.dir(results);
}
