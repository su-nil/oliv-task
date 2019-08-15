import axios from 'axios';

export default async function getApiKey() {
	const response = await axios.get('/getapikey').then((res) => res);
	return response.data;
}
