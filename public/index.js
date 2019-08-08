const googlePlaceSearchApi = require('./googlePlaceSearchApi');
const googleAutocompleteApi = require('./googleAutocompleteApi');

module.exports = function(app, db) {
	googlePlaceSearchApi(app, db);
	googleAutocompleteApi(app, db);
	// Other route groups could go here, in the future
};
