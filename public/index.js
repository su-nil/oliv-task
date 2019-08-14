const googlePlaceSearchApi = require('./googlePlaceSearchApi');
const googleAutocompleteApi = require('./googleAutocompleteApi');
const yelpSearchApi = require('./yelpSearchApi');
const sendMapsApiKey = require('./sendMapsApiKey');

module.exports = function(app, db) {
	googlePlaceSearchApi(app, db);
	googleAutocompleteApi(app, db);
	yelpSearchApi(app, db);
	sendMapsApiKey(app, db);
	// Other route groups could go here, in the future
};
