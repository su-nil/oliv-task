// TODO try catch for all async/await and promises, display MateriaalUI dialog when there is an error
// TODO Refactor styles, possibly move it to a separate file
// TODO Move inline styles to styles object
// TODO Figure out proper way to fetch API key from backend server
// TODO Use LocalStorage to display restaurants
// TODO Employ react router with LatLng/place as req parameter
// TODO Refactor to Hooks

import React, { Component } from 'react';
import ResultsArea from './ResultsArea';
import Map from './Map';
import Header from './Header';

import yelpResults from './yelpHelper';
import geoLocate from './geolocationHelpher';
import getApiKey from './getApiKey';

import { withStyles } from '@material-ui/styles';

/*
Note: Temporarily using API key on client side since fetching Api Key from backend darkens map 
and prompts that the maps is not rendered properly 
*/

const MAPS_API_KEY = 'AIzaSyDAQOhuvUriLPgDzVblnSSH7BUj-s2EMSw';

const styles = {
	root: {
		display: 'grid',
		gridTemplateRows: '15% 85%',
		gridTemplateColumns: '30% 70%'
	},
	header: {
		gridRow: '1 / 2',
		gridColumn: '2 / 3'
		// gridArea: 'header',
	},
	results: {
		gridRow: '1 / 3',
		gridColumn: '1 / 2'
		// gridArea: 'results',
	},
	map: {
		gridRow: '2 / 3',
		gridColumn: '2 / 3'
		// gridArea: 'map',
	}
};

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mapsApiKey: '',
			restaurants: [],
			coordinates: { lat: 36.778261, lng: -119.4179324 },
			resultsArea: 'startsearch',
			showMap: true
		};
		this.fetchResults = this.fetchResults.bind(this);
		this.submitMyLocation = this.submitMyLocation.bind(this);
	}

	async fetchResults(place) {
		this.setState({ ...this.state, resultsArea: 'loading' });
		const { geometry: { location: coordinates } } = place;
		const restaurants = await yelpResults(coordinates);
		console.log(coordinates);
		this.setState({ ...this.state, restaurants, coordinates, resultsArea: 'results' });
	}

	async submitMyLocation() {
		const { latitude: lat, longitude: lng } = await geoLocate();
		const coordinates = { lat, lng };
		const restaurants = await yelpResults(coordinates);
		this.setState({ restaurants, coordinates });
	}

	// async componentWillMount() {
	// 	const mapsApiKey = await getApiKey();
	// 	this.setState({ mapsApiKey });
	// }

	render() {
		const { classes } = this.props;
		const { restaurants, coordinates, resultsArea, showMap } = this.state;

		return (
			<div className={classes.root}>
				<div className={classes.header}>
					<Header fetchResults={this.fetchResults} submitMyLocation={this.submitMyLocation} />
				</div>

				<div className={classes.results}>
					<ResultsArea results={restaurants} resultsArea={resultsArea} />
				</div>
				<div className={classes.map}>
					<Map
						results={restaurants}
						center={coordinates}
						zoom={13}
						apiKey={MAPS_API_KEY}
						// apiKey={this.state.mapsApiKey}
					/>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(App);

{
	/* <Hidden smDown>
						<div className={classes.map}>
							<Map
								results={restaurants}
								center={coordinates}
								zoom={13}
								apiKey={MAPS_API_KEY}
								// apiKey={this.state.mapsApiKey}
							/>
						</div>
					</Hidden> */
}

{
	/* <Grid className={classes.root} container>
				<Grid xs={12} md={8} className={classes.searchMapContainer} item>
					<Grid className={classes.header} item>
						<SearchBox fetchResults={this.fetchResults} />
						<MyLocation submitMyLocation={this.submitMyLocation} />
						<div>
							<Hidden mdUp>
								<Switch color="primary" value="showMap" />
								<span>Show Map</span>
							</Hidden>
						</div>
					</Grid>
				</Grid>
				<Grid xs={12} md={4} className={classes.results} item>
					{isLoading ? (
						<CircularProgress size={80} thickness={5} style={{ alignSelf: 'center', margin: 'auto' }} />
					) : (
						<SearchResults results={restaurants} />
					)}
				</Grid>
				<div className={classes.map}>
					<Map
						results={restaurants}
						center={coordinates}
						zoom={13}
						apiKey={MAPS_API_KEY}
						// apiKey={this.state.mapsApiKey}
					/>
				</div>
			</Grid> */
}

// root: {
// 	display: 'flex',
// 	backgroundColor: 'white',
// 	flexDirection: 'row',
// 	width: '100%',
// 	justifyContent: 'space-around',
// 	flexGrow: 1,
// 	'@media (max-width: 960px)': {
// 		flexDirection: 'column'
// 	}
// },
// searchMapContainer: {
// 	display: 'flex',
// 	flexDirection: 'column'
// },
// results: {
// 	display: 'flex',
// 	flexDirection: 'column',
// 	width: '30%',
// 	height: '100vh',
// 	borderTop: '1px solid lightgrey',
// 	borderLeft: '1px solid lightgrey',
// 	overflow: 'scroll',
// 	'@media (max-width: 960px)': {
// 		width: '100%'
// 	}
// },
// map: {
// 	width: '100%',
// 	height: '100%',
// 	borderTop: '1px solid lightgrey',
// 	position: 'relative'
// },
// header: {
// 	display: 'flex',
// 	flexDirection: 'row',
// 	alignItems: 'center',
// 	justifyContent: 'space-evenly',
// 	flexWrap: 'wrap',
// 	padding: '1%',
// 	'@media (max-width: 960px)': {
// 		paddingBottom: '0'
// 	}
// }
