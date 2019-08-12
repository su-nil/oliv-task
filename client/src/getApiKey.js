import axios from 'axios';

export default async function getApiKey() {
	const response = await axios.get('http://localhost:8000/getapikey').then((res) => res);
	return response.data;
}
