const googlePlaceSearchApi = require('./googlePlaceSearchApi');
const googleAutocompleteApi = require('./googleAutocompleteApi');
const yelpSearchApi = require('./yelpSearchApi');

module.exports = function(app, db) {
	googlePlaceSearchApi(app, db);
	googleAutocompleteApi(app, db);
	yelpSearchApi(app, db);
	// Other route groups could go here, in the future
};
