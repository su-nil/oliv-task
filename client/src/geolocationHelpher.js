// TODO Prompt when geolocation is not available in navigator
// TODO Error when geolocation doesn't return location

export default async function geoLocate() {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition((position) => {
			resolve({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			});
		});
	});
}
