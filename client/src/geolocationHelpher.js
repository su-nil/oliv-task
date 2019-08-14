// TODO Prompt when geolocation is not available in navigator
// TODO Error when geolocation doesn't return location

export default async function geoLocate() {
	// send location
	// send error

	return new Promise((resolve, reject) => {
		var options = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0
		};

		const success = (position) => {
			resolve({
				lat: position.coords.latitude,
				lng: position.coords.longitude
			});
		};

		const error = (error) => {
			reject(`ERROR(${error.code}): ${error.message}`);
		};

		navigator.geolocation.getCurrentPosition(success, error, options);
	});
}
