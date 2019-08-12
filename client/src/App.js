import React, { Component } from 'react';
import SearchBox from './SearchBox';
import SearchResults from './SearchResults';
import MyLocation from './MyLocation';
import Map from './Map';
import yelpResults from './yelpHelper';
import geoLocate from './geolocationHelpher';
import { Grid, Switch, CircularProgress, Hidden } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import getApiKey from './getApiKey';

// Responsive
// TODO Refactor to Hooks
// TODO Throw error if restaurants is not resolved in usemylocation
// TODO Figure out proper way to fetch apikey from backend server
// TODO Use LocalStorage
// TODO Employ react router with place as req parameter

// Using Apikey on client side since fetching Api Key from backend darkens map
const MAPS_API_KEY = 'AIzaSyDAQOhuvUriLPgDzVblnSSH7BUj-s2EMSw';

const styles = {
	root: {
		display: 'flex',
		backgroundColor: 'white',
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-around',
		flexGrow: 1,
		'@media (max-width: 960px)': {
			flexDirection: 'column'
		}
	},
	searchMapContainer: {
		display: 'flex',
		flexDirection: 'column'
	},
	results: {
		display: 'flex',
		flexDirection: 'column',
		width: '30%',
		height: '100vh',
		borderTop: '1px solid lightgrey',
		borderLeft: '1px solid lightgrey',
		overflow: 'scroll',
		'@media (max-width: 960px)': {
			width: '100%'
		}
	},
	map: {
		width: '100%',
		height: '100%',
		borderTop: '1px solid lightgrey',
		position: 'relative'
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		flexWrap: 'wrap',
		padding: '1%',
		'@media (max-width: 960px)': {
			paddingBottom: '0'
		}
	}
};

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mapsApiKey: '',
			restaurants: [],
			coordinates: { lat: 36.778261, lng: -119.4179324 },
			isLoading: false
		};
		this.fetchResults = this.fetchResults.bind(this);
		this.submitMyLocation = this.submitMyLocation.bind(this);
	}

	async fetchResults(place) {
		this.setState({ isLoading: true });
		const { geometry: { location: coordinates } } = place;
		const restaurants = await yelpResults(coordinates);
		console.log(coordinates);

		this.setState({ restaurants, coordinates, isLoading: false });
	}

	async submitMyLocation() {
		const { latitude: lat, longitude: lng } = await geoLocate();
		const coordinates = { lat, lng };
		const restaurants = await yelpResults(coordinates);
		// TODO throw error if restaurants is not resolved
		this.setState({ restaurants, coordinates });
	}

	async componentWillMount() {
		const mapsApiKey = await getApiKey();
		this.setState({ mapsApiKey });
	}

	render() {
		const { classes } = this.props;
		const { restaurants, coordinates, isLoading } = this.state;
		return (
			<Grid className={classes.root} container>
				<Grid xs={12} md={8} className={classes.searchMapContainer} item>
					<Grid className={classes.header} item>
						<SearchBox fetchResults={this.fetchResults} />
						<MyLocation submitMyLocation={this.submitMyLocation} />

						<Hidden mdUp>
							<span>
								Show Map<Switch />
							</span>
						</Hidden>
					</Grid>

					<Hidden smDown>
						<div className={classes.map}>
							<Map
								results={restaurants}
								center={coordinates}
								zoom={13}
								apiKey={MAPS_API_KEY}
								// apiKey={this.state.mapsApiKey}
							/>
						</div>
					</Hidden>
				</Grid>
				<Grid xs={12} md={4} className={classes.results} item>
					{isLoading ? (
						<CircularProgress size={80} thickness={5} style={{ alignSelf: 'center', margin: 'auto' }} />
					) : (
						<SearchResults results={restaurants} />
					)}
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(App);
// export default App;
