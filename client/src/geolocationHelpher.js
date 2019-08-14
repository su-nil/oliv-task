export default function geoLocate() {
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
