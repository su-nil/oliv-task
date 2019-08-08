const googlePlaceSearch = require('./google-place-search');

module.exports = function(app, db) {
	googlePlaceSearch(app, db);
	// Other route groups could go here, in the future
};
