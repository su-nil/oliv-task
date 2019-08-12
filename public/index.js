const googlePlaceSearchApi = require('./googlePlaceSearchApi');
const googleAutocompleteApi = require('./googleAutocompleteApi');
const yelpSearchApi = require('./yelpSearchApi');
const geolocationApi = require('./geolocationApi');
const sendMapsApiKey = require('./sendMapsApiKey');

module.exports = function(app, db) {
	googlePlaceSearchApi(app, db);
	googleAutocompleteApi(app, db);
	yelpSearchApi(app, db);
	geolocationApi(app, db);
	sendMapsApiKey(app, db);
	// Other route groups could go here, in the future
};
